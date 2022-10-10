/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "components/atoms/Link";

type SearchResultType = {
    text?: string;
    onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
};

const SearchResult = (props: SearchResultType) => {
    return (
        <div
            css={css({
                display: "flex",
                margin: 5,
                textAlign: "left",
            })}
        >
            <Link
                css={css({ textAlign: "left", color: "skyblue" })}
                onClick={props.onClick}
                href=""
            >
                {props.text}
            </Link>
        </div>
    );
};

export default SearchResult;