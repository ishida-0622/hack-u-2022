/** @jsxImportSource @emotion/react */
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "components/organisms/LoginForm";
import Default from "components/template/Default";
import useLoginUser from "hooks/useLoginUser";
import { Link } from "react-router-dom";
import Text from "components/atoms/Text";
import { css } from "@emotion/react";

const Login = () => {
    document.title = "Login";
    const navigate = useNavigate();

    const { user } = useLoginUser();

    const [inputtedEmail, setInputtedEmail] = useState("");
    const [inputtedPassword, setInputtedPassword] = useState("");

    const handlerChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputtedEmail(event.target.value);
    };

    const handlerChangePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputtedPassword(event.target.value);
    };

    const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(inputtedEmail, inputtedPassword);
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
            <Default notNav={true} loginCheck={false}>
                {user ? (
                    <Navigate to={"/"}></Navigate>
                ) : (
                    <div css={css({ textAlign: "center" })}>
                        <LoginForm
                            onSubmit={(e) => handlerSubmitForm(e)}
                            emailOnChange={(e) => handlerChangeEmail(e)}
                            passwordOnChange={(e) => handlerChangePassword(e)}
                        />
                        <Text>
                            アカウントをお持ちでない方は
                            <Link to="/signup">こちら</Link>
                        </Text>
                    </div>
                )}
            </Default>
        </>
    );
};

export default Login;
