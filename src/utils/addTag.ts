import zenkakuToHankaku from "utils/zenkakuToHankaku";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { allTagsConverter } from "types/allTagsType";
import { tagType } from "types/tagType";

/**
 * タグを追加する
 * @param tag 追加するタグ
 * @returns DBにタグが追加されたら解決されるPromise
 */
const addTag = (tag: string): Promise<void> => {
    // タグの全角アルファベット数字記号を半角に変更
    const replacedTag = zenkakuToHankaku(tag);

    return new Promise((resolve, reject) => {
        getDoc(doc(db, `tags/${tag}/followers/${tag}`)).then((val) => {
            if (val.data() !== undefined) {
                resolve();
            } else {
                getDoc(doc(db, "all_tags/all").withConverter(allTagsConverter))
                    .then((val) => {
                        updateDoc(val.ref, {
                            tags: val.data()!.tags.concat([replacedTag]).sort(),
                        })
                            .then(() => {
                                const setData: tagType = {
                                    followers: [],
                                };
                                setDoc(
                                    doc(
                                        db,
                                        `tags/${replacedTag}/followers/${replacedTag}`
                                    ),
                                    setData
                                )
                                    .then(() => resolve())
                                    .catch((e) => reject(e.code));
                            })
                            .catch((e) => reject(e.code));
                    })
                    .catch((e) => reject(e.code));
            }
        });
    });
};

export default addTag;
