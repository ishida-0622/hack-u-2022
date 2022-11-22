/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { tagStyle } from "./style";

const Tag = (props: {
    readonly className?: string;
    readonly tagName: string;
    readonly to: string;
    readonly onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
    return (
        <Link css={tagStyle} to={props.to} onClick={props.onClick}>
            {"#" + props.tagName}
        </Link>
    );
};

export default Tag;
