/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Navigate, useLocation } from "react-router-dom";
import Default from "components/template/Default/Default";
import Form from "components/atoms/Form/Form";
import Textarea from "components/atoms/Textarea/Textarea";
import CheckBox from "components/atoms/CheckBox/CheckBox";
import useUserData from "hooks/useUserData";
import Tag from "components/organisms/Tag/Tag";
import Button from "components/atoms/Button/Button";
import useLoginUser from "hooks/useLoginUser";
import { useState, useEffect } from "react";
import Text from "components/atoms/Text/Text";
import useAllTags from "hooks/useAllTags";
import SearchBox from "components/molecules/SearchBox/SearchBox";
import SearchResult from "components/organisms/SearchResult/SearchResult";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { postType } from "types/postType";
import zenkakuToHankaku from "utils/zenkakuToHankaku";

const PostCreate = () => {
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string[]>([]);
    const [userData] = useUserData();
    const [user, load] = useLoginUser();
    const [allTag] = useAllTags();
    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [follows, setFollows] = useState<string[]>([]);
    const [inputedMessage, setInputedMessage] = useState("");
    const [isSpoiler, setIsSpoiler] = useState(false);

    const tagSearch = (inputed: string) => {
        const reg = new RegExp("^" + inputed + ".*$");
        const arr = allTag
            .filter((val) => val.match(reg))
            .filter((v) => v !== from);
        setSearchTags(arr.slice(0, Math.min(10, arr.length)));
    };
    useEffect(() => {
        if (!userData) return;
        setFollows(userData.follows.sort());
    }, [userData]);

    useEffect(() => {
        if (tag) setFrom(tag);
        setTo([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const postCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!window.confirm("投稿しますか?")) return;
        if (!user || !userData || from === null) return;
        const post: postType = {
            author: userData.name,
            author_uid: user.uid,
            author_icon: userData.image_url,
            message: inputedMessage,
            image_url: null,
            is_spoiler: isSpoiler,
            recommender: from,
            recommended_by: to,
        };
        addDoc(collection(db, "posts"), post)
            .then(() => {
                alert("投稿しました");
            })
            .catch((e) => {
                alert("投稿に失敗しました\n" + e.code);
            });
    };

    return (
        <Default>
            {!load ? (
                <h2 css={css({ textAlign: "center" })}>Now Loading...</h2>
            ) : !user ? (
                <Navigate to={"/login"}></Navigate>
            ) : !from ? (
                <div
                    css={css({
                        textAlign: "center",
                    })}
                >
                    <h2>どの推しを布教しますか?</h2>
                    {follows.map((val) => (
                        <Tag
                            key={val}
                            tagName={val}
                            href={""}
                            onClick={(e) => {
                                e.preventDefault();
                                if (!from) {
                                    setFrom(val);
                                    setSearchTags(
                                        allTag.filter((v) => v !== val)
                                    );
                                }
                            }}
                        />
                    ))}
                </div>
            ) : !to.length ? (
                <div
                    css={css({
                        textAlign: "center",
                    })}
                >
                    <h2>
                        「{from}」は
                        <br />
                        どのタグが好きな人におすすめですか？
                    </h2>
                    <div>
                        <SearchBox
                            value={searchBoxValue}
                            placeholder="タグを検索"
                            inputOnChange={(e) => {
                                setSearchBoxValue(e.target.value);
                                tagSearch(zenkakuToHankaku(e.target.value));
                            }}
                        />
                        <div
                            css={css({
                                display: "flex",
                                flexWrap: "wrap",
                                width: "40%",
                                margin: "0 auto",
                            })}
                        >
                            {searchTags.map((v) => (
                                <SearchResult
                                    key={v}
                                    text={"#" + v}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (
                                            selectedTags.some(
                                                (val) => val === v
                                            )
                                        ) {
                                            return;
                                        }
                                        setSelectedTags(
                                            selectedTags.concat([v])
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        css={css({
                            display: "flex",
                            flexWrap: "wrap",
                            width: "40%",
                            margin: "5% auto",
                            textAlign: "left",
                        })}
                    >
                        {selectedTags.map((v) => (
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
                                        setSelectedTags(
                                            selectedTags.filter(
                                                (val) => val !== v
                                            )
                                        )
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
                    <div
                        css={css({
                            width: "100%",
                            position: "fixed",
                            bottom: 80,
                        })}
                    >
                        <Button css={buttonStyle} onClick={() => setFrom(null)}>
                            戻る
                        </Button>
                        <Button
                            css={buttonStyle}
                            onClick={() => setTo(selectedTags)}
                        >
                            決定
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    css={css({
                        textAlign: "center",
                    })}
                >
                    <h2>「{from}」の布教メッセージを入力</h2>
                    <Form>
                        <label>
                            <Textarea
                                value={inputedMessage}
                                name="message"
                                rows={8}
                                cols={50}
                                maxLength={10000}
                                placeholder={"最大10,000文字"}
                                onChange={(e) =>
                                    setInputedMessage(e.target.value)
                                }
                            />
                        </label>
                        <br />
                        <CheckBox
                            defaultChecked={isSpoiler}
                            onChange={() => setIsSpoiler(!isSpoiler)}
                        >
                            ネタバレ有り
                        </CheckBox>
                        <div
                            css={css({
                                width: "100%",
                                position: "fixed",
                                bottom: 80,
                            })}
                        >
                            <Button css={buttonStyle} onClick={() => setTo([])}>
                                戻る
                            </Button>
                            <Button
                                css={buttonStyle}
                                type="submit"
                                onClick={(e) => postCreate(e)}
                            >
                                投稿
                            </Button>
                        </div>
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

export default PostCreate;
