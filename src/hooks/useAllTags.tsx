import { useState, useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { allTagsConverter } from "types/allTagsType";
import { FirebaseError } from "firebase/app";

/**
 * DBからタグの一覧を取得する
 * @returns タグ一覧, タグ取得関数, ローディング中?, エラーメッセージ
 */
const useAllTags = () => {
    const [allTags, setAllTags] = useState<string[]>([]); // タグ一覧
    const [isLoading, setLoad] = useState(true); // ローディング中か？
    const [error, setError] = useState(""); // エラーメッセージ
    // DBからタグの一覧を取得する
    const getAllTags = useCallback(async () => {
        try {
            const res = (
                await getDoc(
                    doc(db, "all_tags/all").withConverter(allTagsConverter)
                )
            ).data();
            setAllTags(res ? res.tags : []);
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.code);
            } else if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Error");
            }
        } finally {
            setLoad(false);
        }
    }, []);
    return { allTags, getAllTags, isLoading, error };
};

export default useAllTags;
