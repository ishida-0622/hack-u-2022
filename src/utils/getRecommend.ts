import { User } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "firebaseConfig";
import { postTypeConverter, postType } from "types/postType";

const getRecommend = (user: User): Promise<postType[]> => {
    return new Promise((resolve, reject) => {
        getDocs(
            query(
                collection(db, "posts"),
                where("author_uid", "==", user.uid)
            ).withConverter(postTypeConverter)
        )
            .then((docs) => {
                resolve(docs.docs.map((v) => v.data()));
            })
            .catch((e) => {
                reject(e.code);
            });
    });
};

export default getRecommend;
