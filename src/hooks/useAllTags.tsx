import { useState, useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { allTagsConverter } from "types/allTagsType";
import { FirebaseError } from "firebase/app";

const useAllTags = () => {
    const [allTags, setAllTags] = useState<string[]>([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");
    const getAllTags = useCallback(async () => {
        try {
            const res = (
                await getDoc(
                    doc(db, "all_tags/all").withConverter(allTagsConverter)
                )
            ).data();
            setAllTags(res ? res.tags : []);
            setLoad(true);
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.code);
            } else if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Error");
            }
            setLoad(true);
        }
    }, []);
    return { allTags, getAllTags, load, error };
};

export default useAllTags;
