/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "components/atoms/Link/Link";
// import Text from "components/atoms/Text/Text";

type TagType = {
    className?: string;
    tagName: string;
};

const Tag = (props: TagType) => {
    return (
        <Link css={TagStyle} href={`/bar?tag=${props.tagName}`}>
            {"#" + props.tagName}
        </Link>
    );
};

const TagStyle = css({
    color: "#6bb6ff",
    backgroundColor: "white",
    margin: "5px",
    padding: 5,
    border: "solid",
    // borderColor: "#258fb8",
    borderRadius: 10,
});

export default Tag;
