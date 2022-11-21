/** @jsxImportSource @emotion/react */
import FollowButton from "components/organisms/FollowButton";
import { LoginContext } from "components/organisms/LoginCheck";
import useAllTags from "hooks/useAllTags";
import useUserData from "hooks/useUserData";
import { useContext, useLayoutEffect, useMemo, useState } from "react";
import addFollow from "utils/addFollow";
import unFollow from "utils/unFollow";
import Tag from "./Tag";
import { showTagStyle, divStyle } from "./style";
import SearchBox from "components/molecules/SearchBox";

const ShowTag = (props: { mode: "all" | "follow" | "notFollow" | null }) => {
    const [userData] = useUserData();
    const { allTags, getAllTags } = useAllTags();
    getAllTags();
    const [followTags, setFollowTags] = useState<string[]>([]);
    const [notFollowTags, setNotFollowTags] = useState<string[]>([]);
    const [showTags, setShowTags] = useState<string[]>([]);
    const [follows, setFollows] = useState<Set<string>>(new Set());
    const user = useContext(LoginContext);
    const [searchBoxValue, setSearchBoxValue] = useState("");

    useLayoutEffect(() => {
        if (!userData) return;
        setFollows(new Set(userData.follows));
    }, [userData]);

    useLayoutEffect(() => {
        setFollowTags(allTags.filter((v) => follows.has(v)));
        setNotFollowTags(allTags.filter((v) => !follows.has(v)));
        setShowTags(
            props.mode === "all"
                ? allTags
                : props.mode === "follow"
                ? allTags.filter((v) => follows.has(v))
                : allTags.filter((v) => !follows.has(v))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [follows]);

    useLayoutEffect(() => {
        tagSearch(searchBoxValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mode]);

    const tagSearch = (inputted: string) => {
        const reg = new RegExp("^" + inputted + ".*$");
        const arr = (
            props.mode === "all"
                ? allTags
                : props.mode === "follow"
                ? followTags
                : notFollowTags
        ).filter((v) => v.match(reg));
        setShowTags(arr);
    };

    return useMemo(
        () => (
            <>
                <SearchBox
                    value={searchBoxValue}
                    placeholder={"推しを検索"}
                    inputOnChange={(e) => {
                        setSearchBoxValue(e.target.value);
                        tagSearch(e.target.value);
                    }}
                />
                <div css={divStyle}>
                    {showTags.map((tag) => (
                        <div key={tag} css={showTagStyle}>
                            <Tag tag={tag} />
                            <FollowButton
                                tag={tag}
                                isFollow={follows.has(tag)}
                                functionActivatedWhenFollow={(tag) => {
                                    addFollow(user!, tag);
                                    setFollows(new Set([...follows, tag]));
                                }}
                                functionActivatedWhenUnfollow={(tag) => {
                                    unFollow(user!, Array.from(follows), [tag]);
                                    setFollows(
                                        new Set(
                                            [...follows].filter(
                                                (v) => v !== tag
                                            )
                                        )
                                    );
                                }}
                            />
                        </div>
                    ))}
                </div>
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [showTags]
    );
};

export default ShowTag;
