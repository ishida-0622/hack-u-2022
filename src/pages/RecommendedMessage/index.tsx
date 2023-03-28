/** @jsxImportSource @emotion/react */
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
import { useLocation, useNavigate } from "react-router-dom";
import { postType, postTypeConverter } from "types/postType";
import { css } from "@emotion/react";
import Button from "components/atoms/Button";
import useLoginUser from "hooks/useLoginUser";
import addFollow from "utils/addFollow";
import { userDataConverter } from "types/userDataType";
import Default from "components/template/Default";
import Text from "components/atoms/Text";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Image from "components/atoms/Image";

const RecommendedMessage = () => {
    document.title = "布教メッセージ";
    const navigate = useNavigate();
    const { user } = useLoginUser();
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
            {!tag || posts === null ? (
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
                                    {val.is_spoiler ? (
                                        <Text
                                            css={css({
                                                wordWrap: "break-word",
                                                minWidth: 0,
                                            })}
                                        >
                                            <Link
                                                to=""
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setOpen(
                                                        val.message +
                                                            i.toString()
                                                    );
                                                }}
                                            >
                                                {"ネタバレメッセージを読む"}
                                            </Link>
                                            <Modal
                                                isOpen={
                                                    open ===
                                                    val.message + i.toString()
                                                }
                                                onRequestClose={() =>
                                                    setOpen(null)
                                                }
                                                css={modalStyle}
                                            >
                                                <Text
                                                    css={css({
                                                        wordWrap: "break-word",
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
                                        </Text>
                                    ) : (
                                        <Text
                                            css={css({
                                                wordWrap: "break-word",
                                                minWidth: 0,
                                            })}
                                        >
                                            {val.message.length >= 200
                                                ? val.message.substring(
                                                      0,
                                                      200
                                                  ) +
                                                  `.....残り${
                                                      val.message.length - 200
                                                  }文字`
                                                : val.message}
                                            {val.message.length >= 200 ? (
                                                <>
                                                    <Link
                                                        to=""
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
                                                        css={modalStyle}
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
                                    )}
                                    {val.image_url ? (
                                        <Image
                                            css={css({
                                                width: "8rem",
                                                height: "auto",
                                                margin: "0 0 0 auto",
                                            })}
                                            imageUrl={
                                                val.image_url
                                                    ? val.image_url
                                                    : undefined
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
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
                                bottom: 40,
                            })}
                        >
                            <Button
                                css={css({
                                    border: "none",
                                    borderRadius: 10,
                                    height: 50,
                                    // backgroundColor: "skyblue",
                                    color: "white",
                                    margin: "0 1% 1% 0",
                                })}
                                onClick={() => {
                                    if (!isFollow) {
                                        addFollow(user!, tag).then(() =>
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
                                    // backgroundColor: "skyblue",
                                    color: "white",
                                    margin: "0 0 1% 1%",
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

const modalStyle = css({
    textAlign: "center",
    width: "50%",
    maxHeight: "60%",
    margin: "10% auto",
    border: "solid",
    backgroundColor: "#fff",
    padding: "2%",
    overflow: "auto",
});

export default RecommendedMessage;
