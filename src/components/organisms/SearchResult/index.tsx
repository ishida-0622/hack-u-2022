/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const SearchResult = (props: {
    readonly text?: string;
    readonly onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
    return (
        <div
            css={css({
                display: "flex",
                margin: 5,
                textAlign: "left",
            })}
        >
            <Link
                css={css({ textAlign: "left", color: "#1da1f2" })}
                onClick={props.onClick}
                to=""
            >
                {props.text}
            </Link>
        </div>
    );
};

export default SearchResult;
