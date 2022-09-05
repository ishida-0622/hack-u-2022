import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";

const logout = () => {
    if (window.confirm("ログアウトしますか?")) {
        signOut(auth).then(() => {
            window.location.href = "/login";
        });
    }
};

export default logout;
