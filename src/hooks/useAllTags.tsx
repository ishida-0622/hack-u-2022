import { useState, useCallback } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { allTagsConverter } from "types/allTagsType";
import { FirebaseError } from "firebase/app";

/**
 * DBからタグの一覧を取得する
 * @returns タグ一覧, タグ取得関数, タグ取得処理が走ったか?, エラーメッセージ
 */
const useAllTags = () => {
    const [allTags, setAllTags] = useState<string[]>([]); // タグ一覧
    const [load, setLoad] = useState(false); // タグ取得の処理が走ったか？
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
            setLoad(true);
        }
    }, []);
    return { allTags, getAllTags, load, error };
};

export default useAllTags;
