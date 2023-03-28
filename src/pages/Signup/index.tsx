/** @jsxImportSource @emotion/react */
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth, db } from "firebaseConfig";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SignupForm from "components/organisms/SignupForm";
import Default from "components/template/Default";
import useLoginUser from "hooks/useLoginUser";
import { setDoc, doc } from "firebase/firestore";
import { userDataType } from "types/userDataType";
import Text from "components/atoms/Text";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const Signup = () => {
    document.title = "SignUp";
    const navigate = useNavigate();

    const { user } = useLoginUser();

    const [inputtedUsername, setInputtedUsername] = useState("");
    const [inputtedEmail, setInputtedEmail] = useState("");
    const [inputtedPassword, setInputtedPassword] = useState("");
    const [inputtedRepassword, setInputtedRepassword] = useState("");

    const handlerChangeUsername = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputtedUsername(event.target.value);
    };

    const handlerChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputtedEmail(event.target.value);
    };

    const handlerChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputtedPassword(event.target.value);
    };

    const handlerChangeRepassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputtedRepassword(event.target.value);
    };

    const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputtedPassword !== inputtedRepassword) {
            alert("パスワードが一致しません");
        } else {
            signup(inputtedUsername, inputtedEmail, inputtedPassword);
        }
    };

    const signup = (username: string, email: string, pass: string) => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((u) => {
                const initUserData: userDataType = {
                    name: username,
                    image_url: "",
                    follows: [],
                    mutes: [],
                };
                setDoc(doc(db, `users/${u.user.uid}`), initUserData).then(
                    () => {
                        navigate("/");
                    }
                );
            })
            .catch((e) => {
                const errorCode: string = e.code;
                if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
                    alert("そのメールアドレスは使用されています");
                } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
                    alert("メールアドレスの形式が正しくありません");
                } else if (errorCode === AuthErrorCodes.WEAK_PASSWORD) {
                    alert("パスワードは6文字以上で入力してください");
                } else {
                    alert(`Error\n${errorCode}`);
                }
            });
    };

    return (
        <>
            <Default notNav={true} loginCheck={false}>
                {user ? (
                    <Navigate to={"/"}></Navigate>
                ) : (
                    <div css={css({ textAlign: "center" })}>
                        <SignupForm
                            onSubmit={(e) => handlerSubmitForm(e)}
                            usernameOnChange={(e) => handlerChangeUsername(e)}
                            emailOnChange={(e) => handlerChangeEmail(e)}
                            passwordOnChange={(e) => handlerChangePassword(e)}
                            repasswordOnChange={(e) =>
                                handlerChangeRepassword(e)
                            }
                        />
                        <Text>
                            アカウントをお持ちの方は
                            <Link to="/login">こちら</Link>
                        </Text>
                    </div>
                )}
            </Default>
        </>
    );
};

export default Signup;
