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
// import AddTagModalWindow from "components/organisms/AddTagModalWindow/AddTagModalWindow";
import Modal from "react-modal";

const TagList = () => {
    document.title = "タグ一覧";
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [user] = useLoginUser();
    const [modalIsOpen, setModalOpen] = useState(false);
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
                            key={value}
                            css={css({
                                display: "inline-block",
                                // padding: "0 10px",
                            })}
                        >
                            /
                            <Link
                                href={"/recommended-message?tag=" + value}
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
                    <Link
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            setModalOpen(true);
                        }}
                    >
                        新しいタグを追加
                    </Link>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalOpen(false)}
                        css={css({
                            textAlign: "center",
                            width: "50%",
                            height: "14rem",
                            margin: "10% auto",
                            border: "solid",
                            // borderColor: "white",
                            backgroundColor: "#fff",
                        })}
                    >
                        <h2>タグの追加</h2>
                        <Text>
                            <Text css={css({ color: "red" })}>※</Text>
                            表記ゆれ防止のため、正式名称での入力を推奨しています
                        </Text>
                        <br />
                        <Input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder={"推しを入力"}
                        />
                        <br />
                        <Button
                            css={css({
                                margin: 10,
                                width: "5rem",
                                height: "2rem",
                                border: "none",
                                borderRadius: 5,
                                backgroundColor: "#6bb6ff",
                                color: "white",
                                ":hover": {
                                    cursor: "pointer",
                                },
                            })}
                            onClick={() => setModalOpen(false)}
                        >
                            キャンセル
                        </Button>
                        <Button
                            css={css({
                                margin: 10,
                                width: "5rem",
                                height: "2rem",
                                border: "none",
                                borderRadius: 5,
                                backgroundColor: "#6bb6ff",
                                color: "white",
                                ":hover": {
                                    cursor: "pointer",
                                },
                            })}
                            onClick={() => {
                                if (newTag === "") {
                                    alert("入力してください");
                                    return;
                                }
                                if (newTag.includes("/")) {
                                    alert("「/」は使えません");
                                    return;
                                }
                                addTag(newTag).then(() => {
                                    alert("追加しました");
                                    if (
                                        window.confirm(
                                            `「${newTag}」をフォローしますか?`
                                        )
                                    ) {
                                        addFollow(user!, newTag);
                                    }
                                    // setModalOpen(false);
                                    setTags(tags.concat([newTag]));
                                    setNewTag("");
                                });
                            }}
                        >
                            追加
                        </Button>
                    </Modal>
                    {/* <br />
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
                    </Button> */}
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
