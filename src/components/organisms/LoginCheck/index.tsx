import useLoginUser from "hooks/useLoginUser";
import NowLoading from "components/atoms/NowLoading";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const LoginCheck = (props: { children: ReactNode }) => {
    const [user, load] = useLoginUser();
    return (
        <>
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : (
                <>{props.children}</>
            )}
        </>
    );
};

export default LoginCheck;
