/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const NotFound = () => {
    return (
        <>
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
        </>
    );
};

export default NotFound;
