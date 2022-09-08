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
import Foo from "pages/Foo/Foo";
import Bar from "pages/Bar/Bar";
import EditData from "pages/EditData/EditData";

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
            <Route path="/tags" element={<TagList />}></Route>
            <Route path="/foo" element={<Foo />}></Route>
            <Route path="/bar" element={<Bar />}></Route>
            <Route path="/edit" element={<EditData />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    </BrowserRouter>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
