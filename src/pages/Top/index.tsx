/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Default from "components/template/Default";
import Image from "components/atoms/Image";
import icon from "images/icon_trans.png";
import useUserData from "hooks/useUserData";
import NowLoading from "components/atoms/NowLoading";
import { useNavigate } from "react-router-dom";
import Button from "components/atoms/Button";
import { buttonStyle, buttonStyle2 } from "./style";

const Top = () => {
    document.title = "WAIFU sharing";
    const navigate = useNavigate();
    const [userData] = useUserData();

    return (
        <Default>
            {!userData ? (
                <NowLoading />
            ) : userData.follows.length === 0 ? (
                <div css={css({ textAlign: "center" })}>
                    <div>
                        <Image
                            imageUrl={icon}
                            width={"25%"}
                            height={"auto"}
                            alt={"WAIFU sharing"}
                        />
                    </div>
                    <h2>あなたはまだ推しをフォローしていないようです</h2>
                    <Button
                        css={css({
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
                        })}
                        onClick={() => navigate("/tags")}
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
                    <div
                        css={css({
                            margin: "1% 0",
                        })}
                    >
                        <Image
                            imageUrl={icon}
                            width={"30%"}
                            height={"auto"}
                            alt={"WAIFU sharing"}
                        />
                    </div>

                    <Button
                        css={buttonStyle}
                        onClick={() => navigate("/post-create")}
                    >
                        布教する
                    </Button>
                    <Button
                        css={buttonStyle}
                        onClick={() => navigate("/recommended-tags")}
                    >
                        布教される
                    </Button>
                    <br />
                    <Button
                        css={buttonStyle2}
                        onClick={() => navigate("/tags")}
                    >
                        フォローする
                    </Button>
                    <Button
                        css={buttonStyle2}
                        onClick={() => navigate("/my-posts")}
                    >
                        投稿一覧
                    </Button>
                    <Button
                        css={buttonStyle2}
                        onClick={() => navigate("/follows")}
                    >
                        推し一覧
                    </Button>
                </div>
            )}
        </Default>
    );
};

export default Top;
