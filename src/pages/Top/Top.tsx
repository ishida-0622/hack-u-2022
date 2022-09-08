/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import Link from "components/atoms/Link/Link";
import useUserData from "hooks/useUserData";
import { useEffect } from "react";
import NowLoading from "components/atoms/NowLoading/NowLoading";
import { Navigate } from "react-router-dom";
import Button from "components/atoms/Button/Button";

const Top = () => {
    const [userData, load] = useUserData();
    useEffect(() => {
        if (!userData) return;
    });
    return (
        <Default>
            {!load ? (
                <NowLoading />
            ) : !userData ? (
                <Navigate to={"/login"} />
            ) : userData.follows.length === 0 ? (
                <div css={css({ textAlign: "center" })}>
                    <h1>推しが登録されていません</h1>
                    <Button
                        css={css({
                            border: "none",
                            borderRadius: 10,
                            height: 40,
                            backgroundColor: "#6bb6ff",
                            color: "white",
                            margin: "1%",
                            fontSize: "1.5rem",
                            ":hover": {
                                cursor: "pointer",
                            },
                        })}
                    >
                        フォローする
                    </Button>
                </div>
            ) : (
                <div
                    css={css({
                        textAlign: "center",
                    })}
                >
                    <Link href="/post-create">布教する</Link>
                    <Link href="/foo">布教される</Link>
                </div>
            )}
        </Default>
    );
};

export default Top;
