/** @jsxImportSource @emotion/react */
import { useState } from "react";
import useLoginUser from "hooks/useLoginUser";
import { css } from "@emotion/react";
import Text from "components/atoms/Text/Text";
import addFollow from "utils/addFollow";
import Modal from "react-modal";
import Input from "components/atoms/Input/Input";
import Button from "components/atoms/Button/Button";
import addTag from "utils/addTag";

Modal.setAppElement("#root");

const AddTagModalWindow = (props: { isOpen: boolean }) => {
    const [user] = useLoginUser();
    const [modalIsOpen, setIsOpen] = useState(props.isOpen);
    const [newTag, setNewTag] = useState("");

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            css={css({
                textAlign: "center",
                width: "50%",
                height: "12rem",
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
                onClick={() => setIsOpen(false)}
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
                            window.confirm(`「${newTag}」をフォローしますか?`)
                        ) {
                            addFollow(user!, newTag);
                        }
                    });
                }}
            >
                追加
            </Button>
        </Modal>
    );
};

export default AddTagModalWindow;
