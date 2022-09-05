/** @jsxImportSource @emotion/react */
import Text from "components/atoms/Text/Text";
import Image from "components/atoms/Image/Image";
import { css } from "@emotion/react";

type PostType = {
    message: string;
    author: string;
    authorIcon: string | null;
    image: string | null;
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
                <Text text={props.author} />
            </div>
            <div css={css({ margin: 10 })}>
                <Text text={props.message} />
            </div>
            {props.image ? <Image imageUrl={props.image} /> : <></>}
        </div>
    );
};

export default Post;
