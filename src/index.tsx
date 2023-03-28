import ReactDOM from "react-dom/client";
import "index.css";
import NotFound from "pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "pages/Signup";
import Login from "pages/Login";
import Top from "pages/Top";
import RecommendedTags from "pages/RecommendedTags";
import RecommendedMessage from "pages/RecommendedMessage";
import PostCreate from "pages/PostCreate";
import MyPostList from "pages/MyPostList";
import PostEdit from "pages/PostEdit";
import FollowTag from "pages/FollowTag";
import Follow from "pages/Tags";
import Mypage from "pages/Mypage";
import Tags from "pages/Tags";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Top />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/tags" element={<Tags />}></Route>
            <Route path="/follows" element={<FollowTag />}></Route>
            <Route
                path="/recommended-tags"
                element={<RecommendedTags />}
            ></Route>
            <Route
                path="/recommended-message"
                element={<RecommendedMessage />}
            ></Route>
            <Route path="/post-create" element={<PostCreate />}></Route>
            <Route path="/my-posts" element={<MyPostList />}></Route>
            <Route path="/post-edit" element={<PostEdit />}></Route>
            <Route path="/follow" element={<Follow />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    </BrowserRouter>
    // </React.StrictMode>
);
