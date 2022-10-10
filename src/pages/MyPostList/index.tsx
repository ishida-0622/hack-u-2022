/** @jsxImportSource @emotion/react */
import useLoginUser from "hooks/useLoginUser";
import Default from "components/template/Default";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { postType } from "types/postType";
import getRecommend from "utils/getRecommend";
// import Post from "components/organisms/Post/Post";
import Button from "components/atoms/Button";
import NowLoading from "components/atoms/NowLoading";
import Text from "components/atoms/Text";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const MyPostList = () => {
    document.title = "あなたの投稿";
    const navigate = useNavigate();
    const [open, setOpen] = useState<string | null>(null);
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [user] = useLoginUser();
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
            {posts === null ? (
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
                                    textAlign: "left",
                                    backgroundColor: "white",
                                    width: "50%",
                                    margin: "5px auto",
                                    border: "solid",
                                    borderRadius: 10,
                                })}
                            >
                                <Text
                                    css={css({
                                        wordWrap: "break-word",
                                        minWidth: 0,
                                        maxWidth: "90%",
                                        margin: "1%",
                                    })}
                                >
                                    {post.data.message.length >= 200
                                        ? post.data.message.substring(0, 200) +
                                          `.....残り${
                                              post.data.message.length - 200
                                          }文字`
                                        : post.data.message}
                                    {post.data.message.length >= 200 ? (
                                        <>
                                            <Link
                                                to=""
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpen(post.id);
                                                }}
                                            >
                                                {" 読む "}
                                            </Link>
                                            <Modal
                                                isOpen={open === post.id}
                                                onRequestClose={() =>
                                                    setOpen(null)
                                                }
                                                css={css({
                                                    textAlign: "center",
                                                    width: "50%",
                                                    height: "75%",
                                                    margin: "10% auto",
                                                    border: "solid",
                                                    backgroundColor: "#fff",
                                                    padding: "2%",
                                                    overflow: "auto",
                                                })}
                                            >
                                                <Text
                                                    css={css({
                                                        wordWrap: "break-word",
                                                    })}
                                                >
                                                    {post.data.message}
                                                </Text>
                                                <br />
                                                <Button
                                                    css={css({
                                                        marginTop: "3%",
                                                        width: "5rem",
                                                        height: "2rem",
                                                        border: "none",
                                                        borderRadius: 5,
                                                        backgroundColor:
                                                            "skyblue",
                                                        color: "white",
                                                        ":hover": {
                                                            cursor: "pointer",
                                                        },
                                                    })}
                                                    onClick={() =>
                                                        setOpen(null)
                                                    }
                                                >
                                                    閉じる
                                                </Button>
                                            </Modal>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Text>
                                <Button
                                    css={css({
                                        width: "2rem",
                                        maxWidth: "2rem",
                                        margin: "0 0 0 auto",
                                        border: "none",
                                        backgroundColor: "black",
                                        color: "white",
                                        borderRadius: "0 3px 3px 0",
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
                                {/* <Post
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
                                </Post> */}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div css={css({ textAlign: "center" })}>
                    <h1>まだ投稿していません</h1>
                    <Button
                        css={css({
                            width: "10rem",
                            height: "2rem",
                        })}
                        onClick={() => navigate(-1)}
                    >
                        前のページに戻る
                    </Button>
                </div>
            )}
        </Default>
    );
};

export default MyPostList;
