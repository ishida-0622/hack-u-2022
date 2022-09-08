/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import getFollows from "utils/getFollow";
import FollowsForm from "components/organisms/FollowsForm/FollowsForm";
import useLoginUser from "hooks/useLoginUser";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FollowTag = () => {
    const [user, load] = useLoginUser();
    const [tags, setTags] = useState<string[]>([])
    console.log(tags)
    useEffect(() => {
        if (!user) return
        getFollows(user).then((val) => {
            setTags(val);
        });
    }, [user]);
    if(tags === undefined){
        return <></>;
    }
    let tagRec = [];
    for(let i=0; i<tags.length; i++){
        tagRec.push([tags[i]]);
    }
    return(
        <>
            <Default
                contents={[["/", "TOP"], ["#", "タグ一覧"]]}
            >
                {!load ? (
                <h2 css={css({ textAlign: "center" })}>Now Loading...</h2>
                ) : !user ? (
                    <Navigate to={"/login"}></Navigate>
                ) : (
                <FollowsForm
                    tags={tagRec}
                />
                )}
            </Default>
        </>
    );
};

export default FollowTag;
