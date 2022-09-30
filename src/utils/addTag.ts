import zenkakuToHankaku from "utils/zenkakuToHankaku";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { allTagConverter } from "types/allTagsType";
import { tagType } from "types/tagType";

const addTag = (tag: string): Promise<void> => {
    const replacedTag = zenkakuToHankaku(tag);
    return new Promise((resolve, reject) => {
        getDoc(doc(db, "all_tags/all").withConverter(allTagConverter))
            .then((val) => {
                updateDoc(val.ref, {
                    tags: val.data()!.tags.concat([replacedTag]),
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
    });
};

export default addTag;
