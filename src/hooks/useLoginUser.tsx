import { User } from "firebase/auth";
import { useState, useLayoutEffect } from "react";
import getLoginUser from "utils/getLoginUser";

const useLoginUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [load, setLoad] = useState<boolean>(false);
    useLayoutEffect(() => {
        const f = async () => {
            setUser(await getLoginUser());
            setLoad(true);
        };
        f();
    }, []);
    return { user, load };
};

export default useLoginUser;
