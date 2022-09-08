/** @jsxImportSource @emotion/react */
import Link from "components/atoms/Link/Link";
import { css } from "@emotion/react";

type BreadCrumbsType = {
    readonly contents?: string[][]; //[[href, pageName], [href, pageName], ...]
};

const BreadCrumbs = (props: BreadCrumbsType) => {
    if (props.contents === undefined) {
        return <></>;
    }
    return (
        <div id="breadcrumb" css={divStyle}>
            <ol css={olStyle}>
                {props.contents.map((value) => (
                    <li key={value[1]} css={liStyle}>
                        <Link href={value[0]} css={linkStyle}>
                            {value[1]}
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
};

const divStyle = css({
    width: "100vw",
    height: "24px",
    display: "table-cell",
    padding: "5px 0 5px 3%",
});

const olStyle = css({
    display: "inline-block",
    listStyle: "none",
    margin: "0 0 0 10px",
    padding: 0,
});

const liStyle = css({
    display: "inline",
    ":not(:last-child)::after": {
        content: "'>'",
        padding: "0 10px",
    },
});

const linkStyle = css({
    textDecoration: "none",
    color: "#4b4b4b",
    "&:hover": {
        opacity: 0.5,
    },
});

export default BreadCrumbs;
