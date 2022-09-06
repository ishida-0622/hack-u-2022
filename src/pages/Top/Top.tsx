/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import Link from "components/atoms/Link/Link";

const Top = () => {
    return (
        <Default>
            <div
                css={css({
                    textAlign: "center",
                })}
            >
                <Link href="/post-create">布教しに行く</Link>
                <Link href="/foo">布教されに行く</Link>
            </div>
        </Default>
    );
};

export default Top;
