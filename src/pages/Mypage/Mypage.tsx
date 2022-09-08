/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useUserData from "hooks/useUserData";
import Image from "components/atoms/Image/Image";
import Default from "components/template/Default/Default";

const Mypage = () => {
    const [userData] = useUserData();
    return (
        <Default>
            <p
                css={css({
                    textAlign : "center",
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
                imageUrl={userData?.image_url ? userData.image_url : ""}
                width={100}
                height={100}
            /></div>
        </Default>
    );
};

export default Mypage;
