/** @jsxImportSource @emotion/react */
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import Default from "components/template/Default/Default";
import useLoginUser from "hooks/useLoginUser";
import { css } from "@emotion/react";

const Login = () => {
    const navigate = useNavigate();

    const [user] = useLoginUser();

    const [inputedEmail, setInputedEmail] = useState("");
    const [inputedPassword, setInputedPassword] = useState("");

    const handlerChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedEmail(event.target.value);
    };

    const handlerChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputedPassword(event.target.value);
    };

    const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(inputedEmail, inputedPassword);
    };

    const login = (email: string, pass: string) => {
        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                navigate("/");
            })
            .catch((e) => {
                const errorCode: string = e.code;
                if (
                    errorCode === AuthErrorCodes.USER_DELETED ||
                    errorCode === AuthErrorCodes.INVALID_PASSWORD
                ) {
                    alert("メールアドレスもしくはパスワードが間違っています");
                } else {
                    alert(errorCode);
                }
            });
    };

    return (
        <>
            <Default>
                {user ? (
                    <Navigate to={"/"}></Navigate>
                ) : (
                    <LoginForm
                        css={style}
                        onSubmit={(e) => handlerSubmitForm(e)}
                        emailOnChange={(e) => handlerChangeEmail(e)}
                        passwordOnChange={(e) => handlerChangePassword(e)}
                    />
                )}
            </Default>
        </>
    );
};

const style = css({
    // textAlign: "center",
    // borderRadius: "30px",
})

export default Login;
