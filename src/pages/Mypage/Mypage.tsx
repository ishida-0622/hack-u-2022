/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useUserData from "hooks/useUserData";
import Image from "components/atoms/Image/Image";
import Default from "components/template/Default/Default";
// import NowLoading from "components/atoms/NowLoading/NowLoading";
// import { Navigate } from "react-router-dom";
// import useLoginUser from "hooks/useLoginUser";

const Mypage = () => {
    document.title = "マイページ";
    // const [user, load] = useLoginUser();
    const [userData] = useUserData();
    return (
        <Default>
            <h2>登録情報</h2>

            <div
                css={css({
                    display: "block",
                    margin: "0 auto",
                    width: "200px",
                    height: "100px",
                })}
            >
                <div
                    css={css({
                        addingTop: "10px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        fontSize: "25px",
                    })}
                >
                    <Image
                        imageUrl={userData?.image_url ? userData.image_url : ""}
                        width={100}
                        height={100}
                    />
                    {userData?.name}
                </div>
            </div>
        </Default>
    );
};

export default Mypage;
