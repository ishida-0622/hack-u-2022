/** @jsxImportSource @emotion/react */
import Text from "components/atoms/Text";
import Image from "components/atoms/Image";
import { css } from "@emotion/react";
import { ReactNode } from "react";

const Post = (props: {
    readonly message: string;
    readonly author: string;
    readonly authorIcon?: string;
    readonly image?: string;
    readonly isSpoiler: boolean;
    readonly recommendedBy: string[];
    readonly children?: ReactNode;
}) => {
    return (
        <div
            css={css({
                display: "flex",
                textAlign: "left",
                backgroundColor: "white",
                width: "50%",
                margin: "5px auto",
                border: "solid",
                borderRadius: 10,
            })}
        >
            <Image
                css={css({
                    borderRadius: "10px",
                    margin: 0,
                })}
                imageUrl={props.authorIcon ? props.authorIcon : ""}
                width={50}
                height={50}
            />
            <div css={css({ margin: 10, padding: 0 })}>
                <Text>{"@" + props.author}</Text>
                <br />
                <Text>{props.message}</Text>
            </div>
            {props.image ? <Image imageUrl={props.image} /> : <></>}
            {props.children}
        </div>
    );
};

export default Post;
