/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import getFollows from "utils/getFollow";
import FollowsForm from "components/organisms/FollowsForm/FollowsForm";
import useLoginUser from "hooks/useLoginUser";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Link from "components/atoms/Link/Link";

const FollowTag = () => {
    const [user, load] = useLoginUser();
    const [tags, setTags] = useState<string[] | null>(null);
    useEffect(() => {
        if (!user) return;
        getFollows(user).then((val) => {
            setTags(val);
        });
    }, [user]);

    return (
        <>
            <Default
                contents={[
                    ["/", "TOP"],
                    ["#", "タグ一覧"],
                ]}
            >
                {!load ? (
                    <h2 css={css({ textAlign: "center" })}>Now Loading...</h2>
                ) : !user ? (
                    <Navigate to={"/login"}></Navigate>
                ) : !tags ? (
                    <></>
                ) : (
                    <div>
                        {tags.length === 0 ? (
                            <div>
                                <h3>フォローしているタグがありません。</h3>
                                <Link href={"/tags?mode=follow"}>
                                    推しを登録しに行く
                                </Link>
                            </div>
                        ) : (
                            <>
                                {tags.map((tag) => (
                                    <FollowsForm key={tag} tag={tag} />
                                ))}
                            </>
                        )}
                    </div>
                )}
            </Default>
        </>
    );
};

export default FollowTag;
