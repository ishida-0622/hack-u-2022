/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import useUserData from "hooks/useUserData";
import { useEffect } from "react";
import NowLoading from "components/atoms/NowLoading/NowLoading";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "components/atoms/Button/Button";
import useLoginUser from "hooks/useLoginUser";

const Top = () => {
    document.title = "WAIFU sharing";
    const navigate = useNavigate();
    const [userData] = useUserData();
    const [user, load] = useLoginUser();
    useEffect(() => {
        if (!userData) return;
    }, [userData]);
    return (
        <Default>
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : !userData ? (
                <NowLoading />
            ) : userData.follows.length === 0 ? (
                <div css={css({ textAlign: "center" })}>
                    <h1>あなたはまだ推しをフォローしていないようです</h1>
                    <Button
                        css={css({
                            border: "none",
                            borderRadius: 10,
                            width: "12rem",
                            height: "3rem",
                            backgroundColor: "#6bb6ff",
                            color: "white",
                            margin: "1%",
                            fontSize: "1.5rem",
                            ":hover": {
                                cursor: "pointer",
                            },
                        })}
                        onClick={() => navigate("/follow")}
                    >
                        フォローする
                    </Button>
                </div>
            ) : (
                <div
                    css={css({
                        textAlign: "center",
                        display: "block",
                    })}
                >
                    <Button
                        css={ButtonStyle}
                        onClick={() => navigate("/post-create")}
                    >
                        布教する
                    </Button>
                    <Button
                        css={ButtonStyle}
                        onClick={() => navigate("/recommended-tags")}
                    >
                        布教される
                    </Button>
                    <Button
                        css={ButtonStyle}
                        onClick={() => navigate("/follow")}
                    >
                        フォローする
                    </Button>
                    <br />
                    <Button
                        css={ButtonStyle2}
                        onClick={() => navigate("/my-posts")}
                    >
                        投稿一覧
                    </Button>
                    <Button
                        css={ButtonStyle2}
                        onClick={() => navigate("/tags")}
                    >
                        タグ一覧
                    </Button>
                    <Button
                        css={ButtonStyle2}
                        onClick={() => navigate("/follows")}
                    >
                        推し一覧
                    </Button>
                </div>
            )}
        </Default>
    );
};

const ButtonStyle = css({
    border: "none",
    borderRadius: 10,
    width: "12rem",
    height: "3rem",
    backgroundColor: "#6bb6ff",
    color: "white",
    margin: "10% 1% 0 1%",
    fontSize: "1.5rem",
    ":hover": {
        cursor: "pointer",
    },
});

const ButtonStyle2 = css({
    border: "none",
    borderRadius: 10,
    width: "12rem",
    height: "3rem",
    backgroundColor: "#6bb6ff",
    color: "white",
    margin: "1% 1%",
    fontSize: "1.5rem",
    ":hover": {
        cursor: "pointer",
    },
});

export default Top;
