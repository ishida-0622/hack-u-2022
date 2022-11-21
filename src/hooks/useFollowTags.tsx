import { useState, useCallback } from "react";
import getLoginUser from "utils/getLoginUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { userDataConverter } from "types/userDataType";
import { FirebaseError } from "firebase/app";

const useFollowTags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    const getFollowTags = useCallback(async () => {
        try {
            const user = await getLoginUser();
            if (!user) {
                throw Error("user is not login");
            }
            const userData = (
                await getDoc(
                    doc(db, `users/${user.uid}`).withConverter(
                        userDataConverter
                    )
                )
            ).data();
            if (!userData) {
                throw Error("user data is not found");
            }
            setTags(userData.follows.sort());
            setLoad(true);
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.code);
            } else if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Error");
            }
            setLoad(true);
        }
    }, []);
    return { tags, getFollowTags, load, error };
};

export default useFollowTags;
