/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import Text from "components/atoms/Text";
import Modal from "react-modal";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import addTag from "utils/addTag";

Modal.setAppElement("#root");

/**
 * タグを追加するモーダルウィンドウ
 * @param props func -> 追加時にタグを引数にして発火する関数
 * @returns モーダルウィンドウ
 */
const AddTagModalWindow = (props: {
    readonly isOpen: boolean;
    readonly setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    readonly func?: (tag: string) => void;
}) => {
    const [newTag, setNewTag] = useState("");

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.setIsOpen(false)}
            css={modalStyle}
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
            <Button css={buttonStyle} onClick={() => props.setIsOpen(false)}>
                キャンセル
            </Button>
            <Button
                css={buttonStyle}
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
                        setNewTag("");
                        if (props.func) props.func(newTag);
                    });
                }}
            >
                追加
            </Button>
        </Modal>
    );
};

const modalStyle = css({
    textAlign: "center",
    width: "50%",
    height: "12rem",
    margin: "10% auto",
    border: "solid",
    // borderColor: "white",
    backgroundColor: "#fff",
});

const buttonStyle = css({
    margin: 10,
    width: "5rem",
    height: "2rem",
    border: "none",
    borderRadius: 5,
    // backgroundColor: "#6bb6ff",
    color: "white",
    ":hover": {
        cursor: "pointer",
    },
});

export default AddTagModalWindow;
