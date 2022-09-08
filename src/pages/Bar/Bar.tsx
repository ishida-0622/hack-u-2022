/** @jsxImportSource @emotion/react */
import Post from "components/organisms/Post/Post";
import {
    getDocs,
    query,
    collection,
    where,
    getDoc,
    doc,
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { postType, postTypeConverter } from "types/postType";
import { css } from "@emotion/react";
import Button from "components/atoms/Button/Button";
import useLoginUser from "hooks/useLoginUser";
import addFollow from "utils/addFollow";
import { userDataConverter } from "types/userDataType";
import Default from "components/template/Default/Default";
import NowLoading from "components/atoms/NowLoading/NowLoading";

const Bar = () => {
    const navigate = useNavigate();
    const [user, load] = useLoginUser();
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [isFollow, setIsFollow] = useState(false);
    const [posts, setPosts] = useState<postType[] | null>(null);
    // const [follows, setFollows] = useState<Set<string>>(new Set());
    // const [mutes, setMutes] = useState<Set<string>>(new Set());
    useEffect(() => {
        if (!user) return;
        getDoc(
            doc(db, `users/${user.uid}`).withConverter(userDataConverter)
        ).then((res) => {
            const userData = res.data()!;
            if (userData.follows.some((v) => v === tag)) {
                setIsFollow(true);
            }
            // setFollows(new Set(userData.follows));
            // setMutes(new Set(userData.mutes));
            getDocs(
                query(
                    collection(db, "posts"),
                    where("recommender", "==", tag)
                ).withConverter(postTypeConverter)
            )
                .then((val) => {
                    const arr = val.docs.map((v) => v.data());
                    // .filter((a) =>
                    //     a.recommended_by.some((b) => follows.has(b))
                    // )
                    // .filter((c) =>
                    //     c.recommended_by.every((d) => !mutes.has(d))
                    // );
                    setPosts(arr);
                })
                .catch((e) => {
                    console.log("えらー", e.code);
                });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Default>
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"}></Navigate>
            ) : !tag || posts === null ? (
                <></>
            ) : (
                <>
                    <div css={postsStyle}>
                        <h1>
                            「{tag}」<br />
                            が好きな人からの布教メッセージ
                        </h1>
                        {posts.length === 0 ? <h2>投稿がありません</h2> : <></>}
                        <section>
                            {posts.map((val, i) => {
                                return (
                                    <Post
                                        key={i}
                                        message={val.message}
                                        author={val.author}
                                        authorIcon={
                                            val.author_icon
                                                ? val.author_icon
                                                : undefined
                                        }
                                        image={
                                            val.image_url
                                                ? val.image_url
                                                : undefined
                                        }
                                        isSpoiler={val.is_spoiler}
                                        recommendedBy={val.recommended_by}
                                    />
                                );
                            })}
                        </section>
                        <div
                            css={css({
                                width: "100%",
                                position: "fixed",
                                bottom: 80,
                            })}
                        >
                            <Button
                                css={css({
                                    border: "none",
                                    borderRadius: 10,
                                    height: 50,
                                    backgroundColor: "#6bb6ff",
                                    color: "white",
                                    margin: "0 1% 0 0",
                                })}
                                onClick={() => {
                                    if (!isFollow) {
                                        addFollow(user, tag).then(() =>
                                            setIsFollow(true)
                                        );
                                    }
                                }}
                            >
                                {isFollow
                                    ? "追加済みです"
                                    : `「${tag}」を推しに追加`}
                            </Button>
                            <Button
                                css={css({
                                    border: "none",
                                    borderRadius: 10,
                                    height: 50,
                                    backgroundColor: "#6bb6ff",
                                    color: "white",
                                    margin: "0 0 0 1%",
                                })}
                                onClick={() => navigate(`/foo?tag=${tag}`)}
                            >{`「${tag}」が好きな人へのおすすめへ`}</Button>
                        </div>
                    </div>
                </>
            )}
        </Default>
    );
};

const postsStyle = css({
    textAlign: "center",
});

export default Bar;
