/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
// import Text from "components/atoms/Text/Text";

type TagType = {
    className?: string;
    tagName: string;
    to: string;
    onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
};

const Tag = (props: TagType) => {
    return (
        <Link css={TagStyle} to={props.to} onClick={props.onClick}>
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
