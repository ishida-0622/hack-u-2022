import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import getLoginUser from "utils/getLoginUser";

const useLoginUser = (): [User | null, boolean] => {
    const [user, setUser] = useState<User | null>(null);
    const [load, setLoad] = useState<boolean>(false);
    useEffect(() => {
        const f = async () => {
            setUser(await getLoginUser());
            setLoad(true);
        };
        f();
    }, []);
    return [user, load];
};

export default useLoginUser;
