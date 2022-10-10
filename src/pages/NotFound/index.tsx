/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default";

const NotFound = () => {
    document.title = "Not Found";
    return (
        <Default>
            <h1
                css={css({
                    textAlign: "center",
                })}
            >
                404 NotFound
            </h1>
            <p
                css={css({
                    textAlign: "center",
                })}
            >
                お探しのページは見つかりませんでした
            </p>
        </Default>
    );
};

export default NotFound;
