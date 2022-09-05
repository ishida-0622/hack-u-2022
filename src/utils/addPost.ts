import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { User } from "firebase/auth";
import { postType } from "types/postType";

const addPost = (user: User, post: postType): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!user) reject("user is undefined");
        addDoc(collection(db, "posts"), post)
            .then(() => resolve())
            .catch((e) => reject(e.code));
    });
};

export default addPost;
