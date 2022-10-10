/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";

const NotFollows = () => {
    const navigate = useNavigate();

    return (
        <div css={css({ textAlign: "center" })}>
            <h1>あなたはまだ推しをフォローしていないようです</h1>
            <Button css={buttonStyle} onClick={() => navigate("/follow")}>
                フォローする
            </Button>
        </div>
    );
};

const buttonStyle = css({
    border: "none",
    borderRadius: 10,
    width: "12rem",
    height: "3rem",
    // backgroundColor: "#6bb6ff",
    color: "white",
    // margin: "1%",
    fontSize: "1.5rem",
    ":hover": {
        cursor: "pointer",
    },
});

export default NotFollows;
