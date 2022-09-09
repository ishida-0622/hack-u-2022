/** @jsxImportSource @emotion/react */
// import Post from "components/organisms/Post/Post";
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
import Text from "components/atoms/Text/Text";
import Modal from "react-modal";
import Link from "components/atoms/Link/Link";

const RecommendedMessage = () => {
    document.title = "布教メッセージ";
    const navigate = useNavigate();
    const [user, load] = useLoginUser();
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [isFollow, setIsFollow] = useState(false);
    const [posts, setPosts] = useState<postType[] | null>(null);
    const [open, setOpen] = useState<string | null>(null);
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
        <Default
            contents={[
                ["/", "TOP"],
                ["/recommended-tags", "布教される"],
                ["#", "布教メッセージ"],
            ]}
        >
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
                            「{tag}」が
                            <br />
                            好きな人からの布教メッセージ
                        </h1>
                        {posts.length === 0 ? <h2>投稿がありません</h2> : <></>}
                        <section
                            css={css({ display: "blok", marginBottom: 80 })}
                        >
                            {posts.map((val, i) => (
                                <div
                                    key={val.message + i.toString()}
                                    css={css({
                                        display: "flex",
                                        textAlign: "left",
                                        backgroundColor: "white",
                                        width: "50%",
                                        margin: "5px auto",
                                        border: "solid",
                                        borderRadius: 10,
                                        padding: "1%",
                                    })}
                                >
                                    <Text
                                        css={css({
                                            wordWrap: "break-word",
                                            minWidth: 0,
                                        })}
                                    >
                                        {val.message.length >= 200
                                            ? val.message.substring(0, 200) +
                                              `.....残り${
                                                  val.message.length - 200
                                              }文字`
                                            : val.message}
                                        {val.message.length >= 200 ? (
                                            <>
                                                <Link
                                                    href=""
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setOpen(
                                                            val.message +
                                                                i.toString()
                                                        );
                                                    }}
                                                >
                                                    {" 読む "}
                                                </Link>
                                                <Modal
                                                    isOpen={
                                                        open ===
                                                        val.message +
                                                            i.toString()
                                                    }
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
                                                            wordWrap:
                                                                "break-word",
                                                        })}
                                                    >
                                                        {val.message}
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
                                                                "#6bb6ff",
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
                                </div>
                                // <Post
                                //     key={i}
                                //     message={val.message}
                                //     author={val.author}
                                //     authorIcon={
                                //         val.author_icon
                                //             ? val.author_icon
                                //             : undefined
                                //     }
                                //     image={
                                //         val.image_url
                                //             ? val.image_url
                                //             : undefined
                                //     }
                                //     isSpoiler={val.is_spoiler}
                                //     recommendedBy={val.recommended_by}
                                // />
                            ))}
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
                                onClick={() =>
                                    navigate(`/recommended-tags?tag=${tag}`)
                                }
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

export default RecommendedMessage;