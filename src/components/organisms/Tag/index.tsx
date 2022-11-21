/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { tagStyle } from "./style";

type TagType = {
    className?: string;
    tagName: string;
    to: string;
    onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
};

const Tag = (props: TagType) => {
    return (
        <Link css={tagStyle} to={props.to} onClick={props.onClick}>
            {"#" + props.tagName}
        </Link>
    );
};

export default Tag;
