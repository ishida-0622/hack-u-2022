/** @jsxImportSource @emotion/react */
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Default from "components/template/Default/Default";
import useLoginUser from "hooks/useLoginUser";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { postType, postTypeConverter } from "types/postType";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import Form from "components/atoms/Form/Form";
import Textarea from "components/atoms/Textarea/Textarea";
import Text from "components/atoms/Text/Text";
import CheckBox from "components/atoms/CheckBox/CheckBox";
import Button from "components/atoms/Button/Button";
import SearchBox from "components/molecules/SearchBox/SearchBox";
import SearchResult from "components/organisms/SearchResult/SearchResult";
import useAllTags from "hooks/useAllTags";
import NowLoading from "components/atoms/NowLoading/NowLoading";

const PostEdit = () => {
    document.title = "投稿編集";
    const navigate = useNavigate();
    const search = useLocation().search;
    const postId = new URLSearchParams(search).get("id");
    const [allTag] = useAllTags();
    const [user, load] = useLoginUser();
    const [post, setPost] = useState<postType | undefined>(undefined);
    const [inputedMessage, setInputedMessage] = useState("");
    const [isSpoiler, setIsSpoiler] = useState(false);
    const [to, setTo] = useState<string[]>([]);
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [searchTags, setSearchTags] = useState<string[]>([]);

    useEffect(() => {
        const f = async () => {
            setPost(
                (
                    await getDoc(
                        doc(db, `posts/${postId}`).withConverter(
                            postTypeConverter
                        )
                    )
                ).data()
            );
        };
        f();
    }, [postId]);

    useEffect(() => {
        if (!post) return;
        setInputedMessage(post.message);
        setIsSpoiler(post.is_spoiler);
        setTo(post.recommended_by);
    }, [post]);

    const tagSearch = (inputed: string) => {
        const reg = new RegExp("^" + inputed + ".*$");
        const arr = allTag.filter((val) => val.match(reg));
        setSearchTags(arr.slice(0, Math.min(10, arr.length)));
    };

    const postUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!window.confirm("更新しますか?")) return;
        if (!user) return;
        const updateData = {
            message: inputedMessage,
            image_url: null,
            is_spoiler: isSpoiler,
            recommended_by: to,
        };
        updateDoc(doc(db, `posts/${postId}`), updateData)
            .then(() => {
                alert("更新しました");
            })
            .catch((e) => {
                alert(`更新に失敗しました\n${e.code}`);
            });
    };

    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["/my-posts", "投稿一覧"],
                ["/#", "投稿編集"],
            ]}
        >
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : !postId ? (
                <Navigate to={"/my-posts"} />
            ) : !post ? (
                <></>
            ) : (
                <div css={css({ textAlign: "center" })}>
                    <h2>「{post.recommender}」を布教する</h2>
                    <Form>
                        <h3>布教メッセージを入力</h3>
                        <Textarea
                            value={inputedMessage}
                            name="message"
                            rows={8}
                            cols={50}
                            maxLength={10000}
                            placeholder={"最大10,000文字"}
                            onChange={(e) => setInputedMessage(e.target.value)}
                        />
                        <br />
                        <CheckBox
                            defaultChecked={isSpoiler}
                            onChange={() => setIsSpoiler(!isSpoiler)}
                        >
                            ネタバレ有り
                        </CheckBox>
                        <div>
                            <h3>
                                「{post.recommender}」は
                                <br />
                                何が好きな人におすすめですか？
                            </h3>
                            <SearchBox
                                value={searchBoxValue}
                                placeholder="タグを検索"
                                inputOnChange={(e) => {
                                    setSearchBoxValue(e.target.value);
                                    tagSearch(
                                        e.target.value.replace(
                                            /[Ａ-Ｚａ-ｚ０-９]/g,
                                            (s) =>
                                                String.fromCharCode(
                                                    s.charCodeAt(0) - 0xfee0
                                                )
                                        )
                                    );
                                }}
                            />
                            <div>
                                {searchTags.map((v) => (
                                    <SearchResult
                                        key={v}
                                        text={"#" + v}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (to.some((val) => val === v)) {
                                                return;
                                            }
                                            setTo(to.concat([v]));
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div
                            css={css({
                                display: "flex",
                                flexWrap: "wrap",
                                // flex: 1,
                                // flexShrink: 0,
                                // flexBasis: "auto",
                                width: "40%",
                                margin: "5% auto",
                                textAlign: "left",
                            })}
                        >
                            {to.map((v) => (
                                <div
                                    key={v}
                                    css={css({
                                        display: "flex",
                                        margin: 3,
                                        padding: 2,
                                        border: "solid",
                                        borderRadius: 5,
                                    })}
                                >
                                    <Text>{v}</Text>
                                    <Button
                                        onClick={() =>
                                            setTo(to.filter((val) => val !== v))
                                        }
                                        css={css({
                                            margin: "auto auto auto 0.5rem",
                                            width: "1.5em",
                                            height: "1.5em",
                                            borderRadius: "50%",
                                            border: "none",
                                            backgroundColor: "red",
                                            ":hover": {
                                                cursor: "pointer",
                                            },
                                        })}
                                    >
                                        <Text
                                            css={css({
                                                color: "white",
                                                fontWeight: "bold",
                                            })}
                                        >
                                            {"×"}
                                        </Text>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button css={buttonStyle} onClick={() => navigate(-1)}>
                            戻る
                        </Button>
                        <Button
                            css={buttonStyle}
                            type="submit"
                            onClick={(e) => postUpdate(e)}
                        >
                            更新
                        </Button>
                    </Form>
                </div>
            )}
        </Default>
    );
};

const buttonStyle = css({
    width: "5rem",
    border: "none",
    borderRadius: 10,
    height: 40,
    backgroundColor: "#6bb6ff",
    color: "white",
    margin: "1%",
});

export default PostEdit;
