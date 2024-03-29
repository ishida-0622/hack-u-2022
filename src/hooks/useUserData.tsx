import { useState, useLayoutEffect } from "react";
import { userDataType, userDataConverter } from "types/userDataType";
import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";
import useLoginUser from "hooks/useLoginUser";

const useUserData = (): [userDataType | null, boolean] => {
    const { user, load: loginLoad } = useLoginUser();
    const [userData, setUserData] = useState<userDataType | null>(null);
    const [load, setLoad] = useState(false);
    useLayoutEffect(() => {
        const f = async () => {
            if (!loginLoad) return;
            setLoad(true);
            if (!user) {
                return;
            }
            setUserData(
                (
                    await getDoc(
                        doc(db, `users/${user.uid}`).withConverter(
                            userDataConverter
                        )
                    )
                ).data()!
            );
        };
        f();
    }, [user]);
    return [userData, load];
};

export default useUserData;
