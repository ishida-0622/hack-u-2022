/** @jsxImportSource @emotion/react */
import { db } from "firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { css } from "@emotion/react";
import Default from "components/template/Default";
import Link from "components/atoms/Link";
import { useEffect, useState } from "react";
import useLoginUser from "hooks/useLoginUser";
import AddTagModalWindow from "components/organisms/AddTagModalWindow";
import NowLoading from "components/atoms/NowLoading";
import { Navigate } from "react-router-dom";

const TagList = () => {
    document.title = "タグ一覧";
    const [tags, setTags] = useState<string[]>([]);
    const [user, load] = useLoginUser();
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
                {!load ? (
                    <NowLoading />
                ) : !user ? (
                    <Navigate to={"/login"} />
                ) : (
                    <>
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
                                        href={
                                            "/recommended-message?tag=" + value
                                        }
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
                            <AddTagModalWindow
                                isOpen={modalIsOpen}
                                setIsOpen={setModalOpen}
                                func={(tag) => setTags(tags.concat([tag]))}
                            />
                        </div>
                    </>
                )}
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
