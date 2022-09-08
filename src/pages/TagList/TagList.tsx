/** @jsxImportSource @emotion/react */
import { db } from "firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { css } from "@emotion/react";
import Default from "components/template/Default/Default";
import Link from "components/atoms/Link/Link";
import { useEffect, useState } from "react";
import Input from "components/atoms/Input/Input";
import Button from "components/atoms/Button/Button";
import Text from "components/atoms/Text/Text";
import addTag from "utils/addTag";
import addFollow from "utils/addFollow";
import useLoginUser from "hooks/useLoginUser";

const TagList = () => {
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [user, load] = useLoginUser();
    useEffect(() => {
        taglist().then((val) => {
            setTags(val);
        });
    }, []);

    return (
        <>
            <Default
                contents={[
                    ["/", "TOP"],
                    ["#", "タグ一覧"],
                ]}
            >
                <h1
                    css={css({
                        textAlign: "center",
                    })}
                >
                    タグ一覧
                </h1>
                <ul>
                    {tags.map((value) => (
                        <li
                            css={css({
                                display: "inline-block",
                                padding: "0 10px",
                            })}
                        >
                            /
                            <Link
                                href={"/bar?tag=" + value}
                                css={css({
                                    paddingLeft: "5px",
                                    textDecoration: "none",
                                })}
                            >
                                #{value}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div
                    css={css({
                        textAlign: "center",
                        width: "100%",
                        position: "fixed",
                        bottom: 80,
                    })}
                >
                    <Text>新しいタグを追加</Text>
                    <br />
                    <Input
                        type="text"
                        value={newTag}
                        placeholder="タグ名を入力"
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            if (window.confirm(`${newTag}を追加しますか?`)) {
                                addTag(newTag).then(() => {
                                    if (
                                        window.confirm(
                                            `${newTag}をフォローしますか?`
                                        ) &&
                                        load
                                    ) {
                                        addFollow(user!, newTag);
                                    }
                                });
                            }
                        }}
                    >
                        追加
                    </Button>
                </div>
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
