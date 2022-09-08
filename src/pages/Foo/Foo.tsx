/** @jsxImportSource @emotion/react */
import { db } from "firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { postTypeConverter } from "types/postType";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import useUserData from "hooks/useUserData";
import Default from "components/template/Default/Default";
import Tag from "components/organisms/Tag/Tag";
import Text from "components/atoms/Text/Text";
import Button from "components/atoms/Button/Button";
import NowLoading from "components/atoms/NowLoading/NowLoading";

const Foo = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [userData, load] = useUserData();
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
        <Default>
            {!load || tags === null ? (
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
                                        href={`/bar?tag=${val}`}
                                    ></Tag>
                                </div>
                            ))
                        ) : (
                            <>
                                <Text>まだおすすめがありません</Text>
                                <br />
                                <Button onClick={() => navigate(-1)}>
                                    前のページに戻る
                                </Button>
                            </>
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

export default Foo;
