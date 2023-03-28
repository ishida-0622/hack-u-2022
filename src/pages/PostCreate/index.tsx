/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import Default from "components/template/Default";
import Form from "components/atoms/Form";
import Textarea from "components/atoms/Textarea";
import CheckBox from "components/atoms/CheckBox";
import useUserData from "hooks/useUserData";
import Tag from "components/organisms/Tag";
import Button from "components/atoms/Button";
import useLoginUser from "hooks/useLoginUser";
import { useState, useEffect } from "react";
import Text from "components/atoms/Text";
import useAllTags from "hooks/useAllTags";
import SearchBox from "components/molecules/SearchBox";
import SearchResult from "components/organisms/SearchResult";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { postType } from "types/postType";
import zenkakuToHankaku from "utils/zenkakuToHankaku";
import NowLoading from "components/atoms/NowLoading";
import ImageInput from "components/atoms/ImageInput";
import NotFollows from "./NotFollows";
import useFollowTags from "hooks/useFollowTags";

const PostCreate = () => {
    document.title = "布教する";
    const search = useLocation().search;
    const tag = new URLSearchParams(search).get("tag");
    const navigate = useNavigate();
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string[]>([]);
    const [userData] = useUserData();
    const { allTags, getAllTags, load } = useAllTags();
    if (!load) getAllTags();
    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const { user } = useLoginUser();
    const {
        followTags,
        getFollowTags,
        isLoading: followTagsIsLoading,
    } = useFollowTags();
    if (followTagsIsLoading) getFollowTags();
    const [inputtedMessage, setInputtedMessage] = useState("");
    const [isSpoiler, setIsSpoiler] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const tagSearch = (inputted: string) => {
        const reg = new RegExp("^" + inputted + ".*$");
        setSearchTags(allTags.filter((val) => val.match(reg) && val !== from));
    };

    useEffect(() => {
        if (tag) setFrom(tag);
        setTo([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (allTags.length === 0) return;
        if (tag) {
            setSearchTags(allTags.filter((v) => v !== tag));
        } else {
            setSearchTags(allTags);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTags]);

    const postCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!window.confirm("投稿しますか?")) return;
        if (!(user && userData && from !== null)) return;
        const post: postType = {
            author: userData.name,
            author_uid: user.uid,
            author_icon: userData.image_url,
            message: inputtedMessage,
            image_url: image,
            is_spoiler: isSpoiler,
            recommender: from,
            recommended_by: to,
        };
        addDoc(collection(db, "posts"), post)
            .then(() => {
                alert("投稿しました");
                window.location.reload();
            })
            .catch((e) => {
                alert("投稿に失敗しました\n" + e.code);
            });
    };

    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["/#", "布教する"],
            ]}
        >
            {followTagsIsLoading ? (
                <NowLoading />
            ) : followTags.length === 0 ? (
                <NotFollows />
            ) : !from ? (
                <div
                    css={css({
                        textAlign: "center",
                    })}
                >
                    <h2>どの推しを布教しますか?</h2>
                    <div
                        css={css({
                            display: "flex",
                            flexWrap: "wrap",
                            width: "50%",
                            margin: "0 auto",
                        })}
                    >
                        {followTags.map((val) => (
                            <Tag
                                key={val}
                                tagName={val}
                                to={""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!from) {
                                        setFrom(val);
                                        setSearchTags(
                                            allTags.filter((v) => v !== val)
                                        );
                                    }
                                }}
                            />
                        ))}
                    </div>
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
                            bottom: 40,
                        })}
                    >
                        <Button
                            css={buttonStyle}
                            onClick={() => (tag ? navigate(-1) : setFrom(null))}
                        >
                            戻る
                        </Button>
                        <Button
                            css={buttonStyle}
                            onClick={() => setTo(selectedTags)}
                        >
                            次へ
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    css={css({
                        textAlign: "center",
                        marginBottom: 80,
                    })}
                >
                    <h2>
                        「{from}」の
                        <br />
                        布教メッセージを入力
                    </h2>
                    <Form>
                        <label>
                            <Textarea
                                value={inputtedMessage}
                                name="message"
                                rows={8}
                                cols={50}
                                maxLength={10000}
                                placeholder={
                                    "○○が××なので△△です！\n特に□□系が好きな人におすすめ！"
                                }
                                onChange={(e) =>
                                    setInputtedMessage(e.target.value)
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
                        <ImageInput
                            resultImageUrl={image}
                            onChange={(e) => {
                                const files = e.currentTarget.files;
                                if (!files || files.length === 0) return;
                                const file = files[0];
                                if (file.size > 1024 ** 2) {
                                    alert("サイズが大きすぎます");
                                    return;
                                }
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setImage(e.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                        />
                        <div
                            css={css({
                                width: "100%",
                                position: "fixed",
                                bottom: 40,
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
    // backgroundColor: "#6bb6ff",
    color: "white",
    margin: "0 1% 1% 1%",
});

export default PostCreate;
