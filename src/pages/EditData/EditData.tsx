/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useUserData from "hooks/useUserData";
import Image from "components/atoms/Image/Image";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

const EditData = () => {
    const [userData] = useUserData();
    const [name, setName] = useState("");
    useEffect(() => {
        if(!userData){return}
        setName(userData.name)
    }, [userData])

    // const [image_url, setIcon] = useState("");
    // useEffect(() => {
    //     if(!userData){return}
    //     setIcon(userData.image_url)
    // }, [userData])

    const submit = () => {
        updateDoc(doc(db, "users/uid"), {}).then(() => {
            alert("正常に更新しました")
        }).catch(() => {
            alert("更新できませんでした")
        })
    }
    return (
        <div>
            <label>
                ユーザ名<br></br>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                アイコン<br></br>
                <Image
                    css={css({
                    })}
                    imageUrl={userData?.image_url ? userData.image_url : ""}
                    width={50}
                    height={50}
                />
            </label>
            <button type="submit" value="設定を反映" onClick={submit} />
        </div>
    );
};

export default EditData;
