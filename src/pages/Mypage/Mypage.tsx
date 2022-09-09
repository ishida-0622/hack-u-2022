/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useUserData from "hooks/useUserData";
import Image from "components/atoms/Image/Image";
import Default from "components/template/Default/Default";
import NowLoading from "components/atoms/NowLoading/NowLoading";
import { Navigate } from "react-router-dom";
import useLoginUser from "hooks/useLoginUser";

const Mypage = () => {
    document.title = "マイページ";
    const [user, load] = useLoginUser();
    const [userData] = useUserData();
    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["/#", "マイページ"],
            ]}
        >
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : (
                <>
                    <p
                        css={css({
                            textAlign: "center",
                        })}
                    >
                        {userData?.name}
                    </p>
                    <div>
                        <Image
                            css={css({
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            })}
                            imageUrl={
                                userData?.image_url ? userData.image_url : ""
                            }
                            width={100}
                            height={100}
                        />
                    </div>
                </>
            )}
        </Default>
    );
};

export default Mypage;
