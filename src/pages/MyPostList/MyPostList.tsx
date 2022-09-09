/** @jsxImportSource @emotion/react */
import useLoginUser from "hooks/useLoginUser";
import Default from "components/template/Default/Default";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { postType } from "types/postType";
import getRecommend from "utils/getRecommend";
import Post from "components/organisms/Post/Post";
import Button from "components/atoms/Button/Button";
import NowLoading from "components/atoms/NowLoading/NowLoading";

const MyPostList = () => {
    document.title = "あなたの投稿";
    const navigate = useNavigate();
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [user, load] = useLoginUser();
    const [posts, setPosts] = useState<{ data: postType; id: string }[] | null>(
        null
    );
    useEffect(() => {
        if (!user) return;
        const f = async () => {
            const docs = await getRecommend(user);
            if (tag) {
                setPosts(docs.filter((val) => val.data.recommender === tag));
            } else {
                setPosts(docs);
            }
        };
        f();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["/#", "投稿一覧"],
            ]}
        >
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"}></Navigate>
            ) : posts === null ? (
                <NowLoading />
            ) : posts.length ? (
                <div css={css({ textAlign: "center" })}>
                    <h2>あなたの{tag ? `「${tag}」を布教した` : ""}投稿</h2>
                    {posts.map((post) => {
                        return (
                            <div
                                key={post.id}
                                css={css({
                                    display: "flex",
                                })}
                            >
                                <Post
                                    message={post.data.message}
                                    author={post.data.author}
                                    authorIcon={
                                        post.data.author_icon
                                            ? post.data.author_icon
                                            : undefined
                                    }
                                    isSpoiler={post.data.is_spoiler}
                                    recommendedBy={post.data.recommended_by}
                                    image={
                                        post.data.image_url
                                            ? post.data.image_url
                                            : undefined
                                    }
                                >
                                    <Button
                                        css={css({
                                            margin: "0 0 0 auto",
                                            border: "none",
                                            backgroundColor: "black",
                                            color: "white",
                                            ":hover": {
                                                cursor: "pointer",
                                            },
                                        })}
                                        onClick={() =>
                                            navigate(`/post-edit?id=${post.id}`)
                                        }
                                    >
                                        編集
                                    </Button>
                                </Post>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <h2>まだ投稿していません</h2>
            )}
        </Default>
    );
};

export default MyPostList;
