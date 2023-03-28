import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { User } from "firebase/auth";
import { postType } from "types/postType";

/**
 * 投稿を追加する
 * @param user ログイン中のユーザー
 * @param post 投稿内容
 * @returns DBに投稿が追加されたら解決されるPromise
 */
const addPost = (user: User, post: postType): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!user) reject("user is undefined");
        addDoc(collection(db, "posts"), post)
            .then(() => resolve())
            .catch((e) => reject(e.code));
    });
};

export default addPost;
