import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { userDataConverter } from "types/userDataType";
import { User } from "firebase/auth";
import { tagConverter } from "../types/tagType";

const addFollow = (user: User, tag: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, `users/${user.uid}`).withConverter(userDataConverter))
            .then((res) => {
                const follows = res.data()?.follows;
                if (!follows) {
                    reject("follows not found");
                    return;
                }
                follows.push(tag);
                const updateData = {
                    follows: follows,
                };
                updateDoc(doc(db, `users/${user.uid}`), updateData)
                    .then(() => {
                        getDoc(
                            doc(
                                db,
                                `tags/${tag}/followers/${tag}`
                            ).withConverter(tagConverter)
                        ).then((res) => {
                            const followers = res.data()?.followers;
                            if (!followers) {
                                reject("followers not found");
                                return;
                            }
                            followers.push(user.uid);
                            updateDoc(doc(db, `tags/${tag}/followers/${tag}`), {
                                followers: followers,
                            }).then(() => {
                                resolve();
                            });
                        });
                    })
                    .catch((e) => {
                        reject(e.code);
                    });
            })
            .catch((e) => {
                reject(e.code);
            });
    });
};

export default addFollow;
