import useLoginUser from "hooks/useLoginUser";
import NowLoading from "components/atoms/NowLoading";
import { Navigate } from "react-router-dom";
import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import { User } from "firebase/auth";

const LoginCheck = (props: { children: ReactNode }) => {
    const [user, load] = useLoginUser();
    const [userContext, setUserContext] = useState<User | null>(null);
    useLayoutEffect(() => {
        setUserContext(user);
    }, [user]);
    return (
        <>
            {!load ? (
                <NowLoading />
            ) : !user ? (
                <Navigate to={"/login"} />
            ) : (
                <LoginContext.Provider value={userContext}>
                    {props.children}
                </LoginContext.Provider>
            )}
        </>
    );
};

export default LoginCheck;
export const LoginContext = createContext<User | null>(null);
