/** @jsxImportSource @emotion/react */
import { db } from "firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { postTypeConverter } from "types/postType";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { css } from "@emotion/react";
import useUserData from "hooks/useUserData";
import Default from "components/template/Default/Default";
import Tag from "components/organisms/Tag/Tag";
import Text from "components/atoms/Text/Text";
import Button from "components/atoms/Button/Button";
import NowLoading from "components/atoms/NowLoading/NowLoading";
import useLoginUser from "hooks/useLoginUser";

const RecommendedTags = () => {
    document.title = "布教される";
    const navigate = useNavigate();
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [user, load] = useLoginUser();
    const [userData] = useUserData();
    const [tags, setTags] = useState<string[] | null>(null);
    useEffect(() => {
        if (!userData) return;
        getDocs(
            query(
                collection(db, "posts"),
                where(
                    "recommended_by",
                    "array-contains-any",
                    tag ? [tag] : userData.follows
                )
            ).withConverter(postTypeConverter)
        )
            .then((val) => {
                setTags(
                    Array.from(
                        new Set(val.docs.map((v) => v.data().recommender))
                    ).sort()
                );
            })
            .catch((e) => {
                console.log("えらー", e.code);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["#", "布教される"],
            ]}
        >
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : tags === null ? (
                <NowLoading />
            ) : (
                <div css={style}>
                    {!tag ? (
                        <h1>あなたへのおすすめ</h1>
                    ) : (
                        <h1>
                            「{tag}」<br />
                            が好きな人へのおすすめ
                        </h1>
                    )}
                    <div
                        css={css({
                            display: "flex",
                            flexWrap: "wrap",
                            width: "40%",
                            margin: "0 auto",
                        })}
                    >
                        {tags.length ? (
                            tags.map((val) => (
                                <div key={val} css={css({ display: "flex" })}>
                                    <Tag
                                        tagName={val}
                                        href={`/recommended-message?tag=${val}`}
                                    ></Tag>
                                </div>
                            ))
                        ) : (
                            <div
                                css={css({
                                    display: "inline",
                                    margin: "0 auto",
                                })}
                            >
                                <Text>まだおすすめがありません</Text>
                                <br />
                                <Button
                                    css={css({
                                        marginTop: "3%",
                                        width: "9rem",
                                        height: "2rem",
                                        border: "none",
                                        borderRadius: 5,
                                        backgroundColor: "#6bb6ff",
                                        color: "white",
                                        ":hover": {
                                            cursor: "pointer",
                                        },
                                    })}
                                    onClick={() => navigate(-1)}
                                >
                                    前のページに戻る
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Default>
    );
};

const style = css({
    textAlign: "center",
});

export default RecommendedTags;
