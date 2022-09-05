import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { userDataConverter } from "types/userDataType";

const getFollows = (user: User): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, `users/${user.uid}`).withConverter(userDataConverter))
        .then((res) => {
            const follows = res.data()?.follows;
            if(follows !== undefined) {
                resolve(follows);
            } else {
                resolve([]);
            }
        })
        .catch((e) => {
            reject(e.code);
        })
    });
};

export default getFollows;
