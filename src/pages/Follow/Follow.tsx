/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import useLoginUser from "hooks/useLoginUser";
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
import AddTagModalWindow from "components/organisms/AddTagModalWindow/AddTagModalWindow";

Modal.setAppElement("#root");

const Follow = () => {
    document.title = "推しフォロー";
    const [user] = useLoginUser();
    const [userData] = useUserData();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [follows, setFollows] = useState<Set<string>>(new Set());
    const [allTag] = useAllTags();
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [searchResult, setSearchResult] = useState<string[]>([]);

    useEffect(() => {
        if (allTag.length > 0) {
            setSearchResult(allTag.slice(0, Math.min(10, allTag.length)));
        }
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
                        backgroundColor: "skyblue",
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
                        : css({
                              ":hover": {
                                  backgroundColor: "#6bb6ff",
                              },
                          }),
                ]}
                onClick={() => {
                    if (isFollow) {
                        if (
                            window.confirm(
                                "フォローを解除してもよろしいですか？"
                            )
                        ) {
                            unFollow(user!, Array.from(follows), [props.tag]);
                            follows.delete(props.tag);
                        }
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
                            <Text
                                css={css({
                                    color: "skyblue",
                                    width: "70%",
                                })}
                            >
                                #{tag}
                            </Text>
                            <FollowButton
                                tag={tag}
                                css={css({ height: "1.6rem" })}
                            />
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
                <AddTagModalWindow
                    isOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                    func={(tag: string) => {
                        allTag.push(tag);
                        tagSearch(searchBoxValue);
                    }}
                />
            </div>
        </Default>
    );
};

type FollowButtonType = {
    readonly tag: string;
    readonly className?: string;
    readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default Follow;
