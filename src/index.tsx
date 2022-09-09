// import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import reportWebVitals from "reportWebVitals";
import NotFound from "pages/NotFound/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "pages/Signup/Signup";
import Login from "pages/Login/Login";
import TagList from "pages/TagList/TagList";
import Top from "pages/Top/Top";
import RecommendedTags from "pages/RecommendedTags/RecommendedTags";
import RecommendedMessage from "pages/RecommendedMessage/RecommendedMessage";
import PostCreate from "pages/PostCreate/PostCreate";
import MyPostList from "pages/MyPostList/MyPostList";
import PostEdit from "pages/PostEdit/PostEdit";
import FollowTag from "pages/FollowTag/FollowTag";
import Follow from "pages/Follow/Follow";
import Mypage from "pages/Mypage/Mypage";
// import EditData from "pages/EditData/EditData";

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
            {/* <Route path="/userdata-edit" element={<EditData />}></Route> */}
            <Route path="/tags" element={<TagList />}></Route>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
