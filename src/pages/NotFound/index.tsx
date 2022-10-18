/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default";
import { Link } from "react-router-dom";

/**
 * 404ページ
 */
const NotFound = () => {
    document.title = "Not Found";
    return (
        <Default css={style}>
            <h1>404 NotFound</h1>
            <p>お探しのページは見つかりませんでした</p>
            <Link to={"/"}>Topへ</Link>
        </Default>
    );
};

const style = css({
    textAlign: "center",
});

export default NotFound;
