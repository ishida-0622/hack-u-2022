import {
    signInWithEmailAndPassword,
    User,
    // AuthErrorCodes,  一旦アラート処理していないので
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SignupForm from "components/template/SignupForm/SignupForm";

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
    }, []);

    const [inputedUsername, setInputedUsername] = useState("");
    const [inputedEmail, setInputedEmail] = useState("");
    const [inputedPassword, setInputedPassword] = useState("");
    const [inputedRepassword, setInputedRepassword] = useState("");

    const handlerChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedUsername(event.target.value);
    };

    const handlerChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedEmail(event.target.value);
    };

    const handlerChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedPassword(event.target.value);
    };

    const handlerChangeRepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputedRepassword(event.target.value);
    };

    const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(inputedPassword !== inputedRepassword) {
            alert("パスワードが一致しません");
        } else {
            signup(inputedUsername, inputedEmail, inputedPassword);
        }
    };

    const signup = (username: string, email: string, pass: string) => {
        console.log(username);  //エラー吐かないように変数を使用
        signInWithEmailAndPassword(auth, email, pass)   //ここでサインアップ処理
            .then(() => {
                navigate("/");
            })
            .catch((e) => {
                const errorCode: string = e.code;
                alert(errorCode);
            });
    };

    return (
        <>
            {user ? (
                <Navigate to={"/"}></Navigate>
            ) : (
                <SignupForm
                    onSubmit={(e) => handlerSubmitForm(e)}
                    usernameOnChange={(e) => handlerChangeUsername(e)}
                    emailOnChange={(e) => handlerChangeEmail(e)}
                    passwordOnChange={(e) => handlerChangePassword(e)}
                    repasswordOnChange={(e) => handlerChangeRepassword(e)}
                />
            )}
        </>
    );
}

export default Signup;
