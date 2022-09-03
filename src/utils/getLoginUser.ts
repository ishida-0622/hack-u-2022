import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "firebaseConfig";

const getLoginUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (u) => {
            if (u) {
                resolve(u);
            } else {
                resolve(null);
            }
        });
    });
};

export default getLoginUser;
