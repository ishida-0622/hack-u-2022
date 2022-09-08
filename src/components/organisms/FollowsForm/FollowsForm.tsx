/** @jsxImportSource @emotion/react */
import Button from "components/atoms/Button/Button";
import Link from "components/atoms/Link/Link";
import { css } from "@emotion/react";

type FollowsFormType = {
    className?: string;
    tag?: string;
    onAddClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onUnfollowClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};

const FollowsForm = (props: FollowsFormType) => {
    return (
        <>
            <div
                className={props.className}
                css={css({ display: "inline-block" })}
            >
                <div>
                    <Link href={"/bar?tag=" + props.tag} target="_blank">
                        #{props.tag}
                    </Link>
                </div>
                <div>
                    <Button onClick={props.onAddClick}>
                        おすすめを新規追加する
                    </Button>
                </div>
            </div>
            <div css={css({ display: "inline-block" })}>
                <div>
                    <Button onClick={props.onUnfollowClick}>
                        フォローを解除する
                    </Button>
                </div>
                <div>
                    <Button onClick={props.onEditClick}>
                        おすすめを編集する
                    </Button>
                </div>
            </div>
        </>
    );
};

export default FollowsForm;
