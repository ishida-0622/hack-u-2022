/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import useLoginUser from "hooks/useLoginUser";
import NowLoading from "components/atoms/NowLoading/NowLoading";
import { Navigate } from "react-router-dom";
import SearchBox from "components/molecules/SearchBox/SearchBox";
import useAllTags from "hooks/useAllTags";
import Default from "components/template/Default/Default";
import { css } from "@emotion/react";
import Text from "components/atoms/Text/Text";
import addFollow from "utils/addFollow";
import useUserData from "hooks/useUserData";
import unFollow from "utils/unFollow";
import Link from "components/atoms/Link/Link";
import Modal from "react-modal";
import Input from "components/atoms/Input/Input";
import Button from "components/atoms/Button/Button";
import addTag from "utils/addTag";

Modal.setAppElement("#root");

const Follow = () => {
    document.title = "推しフォロー";
    const [user, load] = useLoginUser();
    const [userData, userDataLoad] = useUserData();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [follows, setFollows] = useState<Set<string>>(new Set());
    const [allTag, tagLoad] = useAllTags();
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [searchResult, setSearchResult] = useState<string[]>([]);

    useEffect(() => {
        if (allTag.length > 0) setSearchResult(allTag);
    }, [allTag]);

    useEffect(() => {
        if (!userData) return;
        setFollows(new Set(userData.follows));
    }, [userData]);

    const tagSearch = (tag: string) => {
        const reg = new RegExp("^" + tag + ".*$");
        const arr = allTag.filter((val) => val.match(reg));
        setSearchResult(arr.slice(0, Math.min(10, arr.length)));
    };

    const FollowButton = (props: FollowButtonType) => {
        let isFollow = follows.has(props.tag);
        const [text, setText] = useState(isFollow ? "フォロー中" : "フォロー");
        return (
            <button
                className={props.className}
                css={[
                    css({
                        width: "6rem",
                        margin: "0 0 0 auto",
                        border: "none",
                        borderRadius: 5,
                        backgroundColor: "#6bb6ff",
                        color: "white",
                        ":hover": {
                            cursor: "pointer",
                        },
                    }),
                    isFollow
                        ? css({
                              ":hover": {
                                  backgroundColor: "red",
                              },
                          })
                        : css({}),
                ]}
                onClick={() => {
                    if (isFollow) {
                        unFollow(user!, Array.from(follows), [props.tag]);
                        follows.delete(props.tag);
                    } else {
                        addFollow(user!, props.tag);
                        follows.add(props.tag);
                    }
                    isFollow = !isFollow;
                }}
                type="button"
                onMouseOver={() => (isFollow ? setText("フォロー解除") : {})}
                onMouseOut={() => setText(isFollow ? "フォロー中" : "フォロー")}
            >
                {text}
            </button>
        );
    };

    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["/#", "推しフォロー"],
            ]}
        >
            {!load || !userDataLoad || !tagLoad ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : (
                <div css={css({ textAlign: "center" })}>
                    <h1>あなたの推しをフォローしましょう</h1>
                    <SearchBox
                        value={searchBoxValue}
                        placeholder={"推しを検索"}
                        inputOnChange={(e) => {
                            setSearchBoxValue(e.target.value);
                            tagSearch(e.target.value);
                        }}
                    />
                    <div
                        css={css({
                            width: "40%",
                            margin: "10px auto",
                            textAlign: "left",
                        })}
                    >
                        {searchResult.map((tag) => (
                            <div
                                key={tag}
                                css={css({ display: "flex", margin: "5px 0" })}
                            >
                                <Text css={css({ color: "#6bb6ff" })}>
                                    #{tag}
                                </Text>
                                <FollowButton tag={tag} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <Text>
                            推しが見つからない場合は
                            <Link
                                href=""
                                css={css({ ":hover": { cursor: "pointer" } })}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(true);
                                }}
                            >
                                こちら
                            </Link>
                        </Text>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setIsOpen(false)}
                        css={css({
                            textAlign: "center",
                            width: "50%",
                            height: "14rem",
                            margin: "10% auto",
                            border: "solid",
                            // borderColor: "white",
                            backgroundColor: "#fff",
                        })}
                    >
                        <h2>タグの追加</h2>
                        <Text>
                            {/* <Text css={css({ color: "red" })}>※</Text> */}
                            表記ゆれ防止のため、正式名称での入力を推奨しています
                            <br />
                            また、「 / 」は使うことができません
                        </Text>
                        <br />
                        <Input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder={"推しを入力"}
                        />
                        <br />
                        <Button
                            css={css({
                                margin: 10,
                                width: "5rem",
                                height: "2rem",
                                border: "none",
                                borderRadius: 5,
                                backgroundColor: "#6bb6ff",
                                color: "white",
                                ":hover": {
                                    cursor: "pointer",
                                },
                            })}
                            onClick={() => setIsOpen(false)}
                        >
                            キャンセル
                        </Button>
                        <Button
                            css={css({
                                margin: 10,
                                width: "5rem",
                                height: "2rem",
                                border: "none",
                                borderRadius: 5,
                                backgroundColor: "#6bb6ff",
                                color: "white",
                                ":hover": {
                                    cursor: "pointer",
                                },
                            })}
                            onClick={() => {
                                if (newTag === "") {
                                    alert("入力してください");
                                    return;
                                }
                                if (newTag.includes("/")) {
                                    alert("「/」は使えません");
                                    return;
                                }
                                addTag(newTag).then(() => {
                                    alert("追加しました");
                                    allTag.push(newTag);
                                    if (
                                        window.confirm(
                                            `「${newTag}」をフォローしますか?`
                                        )
                                    ) {
                                        addFollow(user, newTag);
                                    }
                                    setNewTag("");
                                });
                            }}
                        >
                            追加
                        </Button>
                    </Modal>
                </div>
            )}
        </Default>
    );
};

type FollowButtonType = {
    readonly tag: string;
    readonly className?: string;
    readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default Follow;
