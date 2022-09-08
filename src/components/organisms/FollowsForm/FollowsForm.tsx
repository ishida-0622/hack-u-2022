/** @jsxImportSource @emotion/react */
// import Text from "components/atoms/Text/Text";
import Button from "components/atoms/Button/Button";
import Link from "components/atoms/Link/Link";
import { css } from "@emotion/react";
import React from "react";

type FollowsFormType = {
    className?: string;
    tags?: string[][];
    onAddClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onUnfollowClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};

const FollowsForm = (props: FollowsFormType) => {
    if(props.tags === undefined){
        return (
            <div
                className={props.className}
            >
                <h3>フォローしているタグがありません。</h3>
                <Link
                    href={"/tags"}
                >
                    推しを登録しに行く
                </Link>
            </div>
        )
    }
    return (
        <>
            <div
                className={props.className}
            >
                { props.tags.map((value) =>
                    <div>
                        <div
                            css={css({display: "inline-block"})}
                        >
                            <div>
                            <Link
                                href={"/foo?tag="+value[0]}
                                target="_blank"
                            >
                                #{value[0]}
                            </Link>
                            </div>
                            <div>
                            <Button
                                onClick={props.onAddClick}
                            >
                                おすすめを新規追加する
                            </Button>
                            </div>
                        </div>

                        <div
                            css={css({display: "inline-block"})}
                        >
                            <div>
                            <Button
                                onClick={props.onUnfollowClick}
                            >
                                フォローを解除する
                            </Button>
                            </div>
                            <div>
                            <Button
                                onClick={props.onEditClick}
                            >
                                おすすめを編集する
                            </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FollowsForm;
