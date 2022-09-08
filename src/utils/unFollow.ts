import { updateDoc, doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "firebaseConfig";
import { tagConverter } from "types/tagType";

/**
 * フォロー解除
 * @param user user
 * @param all 削除前のフォロータグ
 * @param remove 削除するタグ
 * @returns 正常終了 -> resolve エラー -> reject
 */
const unFollow = (
    user: User,
    all: string[],
    remove: string[]
): Promise<void> => {
    const removeSet = new Set(remove);
    const updateData = {
        follows: all.filter((v) => !removeSet.has(v)),
    };

    return new Promise((resolve, reject) => {
        updateDoc(doc(db, `users/${user.uid}`), updateData)
            .then(() => {
                remove.forEach((val) => {
                    getDoc(
                        doc(db, `tags/${val}/followers/${val}`).withConverter(
                            tagConverter
                        )
                    ).then((res) => {
                        const followers = res.data()?.followers;
                        if (!followers) {
                            reject("followers undefined");
                            return;
                        }
                        updateDoc(doc(db, `tags/${val}/followers/${val}`), {
                            followers: followers.filter((v) => v !== user.uid),
                        }).catch((e) => {
                            reject(e.code);
                        });
                    });
                });
                resolve();
            })
            .catch((e) => {
                reject(e.code);
            });
    });
};

export default unFollow;
