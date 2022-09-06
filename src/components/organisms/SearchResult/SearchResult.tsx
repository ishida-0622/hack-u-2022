/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "components/atoms/Link/Link";

type SearchResultType = {
    text?: string;
    onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
};

const SearchResult = (props: SearchResultType) => {
    return (
        <div
            css={css({
                width: "40%",
                margin: "0 auto",
                textAlign: "left",
            })}
        >
            <Link
                css={css({ textAlign: "left", color: "#6bb6ff" })}
                onClick={props.onClick}
                href=""
            >
                {props.text}
            </Link>
        </div>
    );
};

export default SearchResult;
