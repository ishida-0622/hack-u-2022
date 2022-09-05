/** @jsxImportSource @emotion/react */
import { db } from "firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import Link from "components/atoms/Link/Link";
import { useEffect, useState } from "react";

const TagList = () => {
    const [tags, setTags] = useState<string[]>([])
    useEffect(() => {
        taglist().then((val) => {
            setTags(val);
        });
    }, []);
    return(
    <>
        <Default>
            <h1
                css={css({
                    textAlign: "center",
                })}
            >
                タグ一覧
            </h1>
            <ul>
                { tags.map((value) =>
                    <li
                        css={css({
                            display: "inline-block",
                            padding: "0 10px",
                        })}
                    >
                        /
                        <Link
                            href={"/tags/"+value}
                            css={css({
                                paddingLeft: "5px",
                                textDecoration: "none",
                            })}
                        >
                            #{value}
                        </Link>
                    </li>
                )}
            </ul>
        </Default>
    </>
    );
};

const taglist = async (): Promise<string[]> => {

    const firestoreDocument = await getDoc(doc(db, `all_tags/${"all"}`));

    // データを変数に代入
    const firestoreData = firestoreDocument.data();

    // データが無かったらエラー出力して終了
    if (firestoreData === undefined) {
        console.error("undefined");
        return [];
    }

    return firestoreData["tags"];
};

export default TagList;
