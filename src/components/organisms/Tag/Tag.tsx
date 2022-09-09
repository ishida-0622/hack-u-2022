/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "components/atoms/Link/Link";
// import Text from "components/atoms/Text/Text";

type TagType = {
    className?: string;
    tagName: string;
    href?: string;
    onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
};

const Tag = (props: TagType) => {
    return (
        <Link css={TagStyle} href={props.href} onClick={props.onClick}>
            {"#" + props.tagName}
        </Link>
    );
};

const TagStyle = css({
    color: "skyblue",
    backgroundColor: "white",
    margin: "5px",
    padding: 5,
    border: "solid",
    // borderColor: "#258fb8",
    borderRadius: 10,
});

export default Tag;
