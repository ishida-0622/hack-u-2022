/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import useLoginUser from "hooks/useLoginUser";
import SearchBox from "components/molecules/SearchBox";
import useAllTags from "hooks/useAllTags";
import Default from "components/template/Default";
import { css } from "@emotion/react";
import Text from "components/atoms/Text";
import addFollow from "utils/addFollow";
import useUserData from "hooks/useUserData";
import unFollow from "utils/unFollow";
import Link from "components/atoms/Link";
import AddTagModalWindow from "components/organisms/AddTagModalWindow";
import FollowButton from "components/organisms/FollowButton";

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
                                    color: "#1da1f2",
                                    width: "70%",
                                })}
                            >
                                #{tag}
                            </Text>
                            <FollowButton
                                tag={tag}
                                css={css({ height: "1.6rem" })}
                                isFollow={follows.has(tag)}
                                functionActivatedWhenFollow={(tag) => {
                                    addFollow(user!, tag);
                                    follows.add(tag);
                                }}
                                functionActivatedWhenUnfollow={(tag) => {
                                    unFollow(user!, Array.from(follows), [tag]);
                                    follows.delete(tag);
                                }}
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

export default Follow;
