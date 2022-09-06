import { useState, useLayoutEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { allTagConverter } from "types/allTagsType";

const useAllTags = (): [string[], boolean] => {
    const [tags, setTags] = useState<string[]>([]);
    const [load, setLoad] = useState(false);
    useLayoutEffect(() => {
        const getAllTags = async () => {
            const res = (
                await getDoc(
                    doc(db, "all_tags/all").withConverter(allTagConverter)
                )
            ).data()!;
            setTags(res.tags);
            setLoad(true);
        };
        getAllTags();
    }, []);
    return [tags, load];
};

export default useAllTags;
