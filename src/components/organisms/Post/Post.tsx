/** @jsxImportSource @emotion/react */
import Text from "components/atoms/Text/Text";
import Image from "components/atoms/Image/Image";
import { css } from "@emotion/react";

type PostType = {
    message: string;
    author: string;
    authorIcon?: string;
    image?: string;
    isSpoiler: boolean;
    recommendedBy: string[];
};

const Post = (props: PostType) => {
    return (
        <div
            css={css({
                textAlign: "left",
                width: "50%",
                margin: "5px auto",
                border: "solid",
                borderRadius: 10,
            })}
        >
            <div
                css={css({
                    borderBottom: "solid",
                    borderRadius: "10px 10px 0 0",
                })}
            >
                <Image
                    css={css({ borderRadius: "10px" })}
                    imageUrl={props.authorIcon ? props.authorIcon : ""}
                    width={50}
                    height={50}
                />
                <Text>{props.author}</Text>
            </div>
            <div css={css({ margin: 10 })}>
                <Text>{props.message}</Text>
            </div>
            {props.image ? <Image imageUrl={props.image} /> : <></>}
        </div>
    );
};

export default Post;
