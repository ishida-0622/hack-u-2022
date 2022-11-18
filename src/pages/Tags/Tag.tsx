/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { tagStyle } from "./style";

const Tag = (props: { tag: string }) => {
    return (
        <span>
            <Link css={tagStyle} to={`/recommended-message?tag=${props.tag}`}>
                #{props.tag}
            </Link>
        </span>
    );
};

export default Tag;
