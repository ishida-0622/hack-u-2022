/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Button from "components/atoms/Button";

/**
 * フォロー/フォロー解除ボタン
 * @param props functionActivatedWhenFollow -> フォロー時に実行する関数, functionActivatedWhenUnfollow -> フォロー解除時に実行する関数
 * @returns フォローボタン
 */
const FollowButton = (props: {
    className?: string;
    tag: string;
    isFollow: boolean;
    functionActivatedWhenFollow?: (tag: string) => void;
    functionActivatedWhenUnfollow?: (tag: string) => void;
}) => {
    const [isFollow, setIsFollow] = useState(props.isFollow);
    const [text, setText] = useState(isFollow ? "フォロー中" : "フォロー");
    return (
        <Button
            className={props.className}
            css={[buttonStyle(isFollow), hoverStyle(isFollow)]}
            onClick={() => {
                if (isFollow) {
                    if (
                        window.confirm("フォローを解除してもよろしいですか？")
                    ) {
                        if (props.functionActivatedWhenUnfollow) {
                            props.functionActivatedWhenUnfollow(props.tag);
                        }
                    }
                } else {
                    if (props.functionActivatedWhenFollow) {
                        props.functionActivatedWhenFollow(props.tag);
                    }
                }
                setText(isFollow ? "フォロー" : "フォロー解除");
                setIsFollow(!isFollow);
            }}
            onMouseOver={() => (isFollow ? setText("フォロー解除") : {})}
            onMouseOut={() => setText(isFollow ? "フォロー中" : "フォロー")}
        >
            {text}
        </Button>
    );
};

const buttonStyle = (isFollow: boolean) =>
    css({
        width: "6rem",
        margin: "0 0 0 auto",
        border: "none",
        borderRadius: 5,
        backgroundColor: isFollow ? "#1877f2" : "#1da1f2",
        color: "white",
        ":hover": {
            cursor: "pointer",
        },
    });

const hoverStyle = (isFollow: boolean) =>
    css({
        ":hover": {
            backgroundColor: isFollow ? "red" : "#1877f2",
        },
    });

export default FollowButton;
