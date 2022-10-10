/** @jsxImportSource @emotion/react */
import Header from "components/organisms/Header/Header";
import Footer from "components/organisms/Footer/Footer";
import BreadCrumbs from "components/organisms/BreadCrumbs/BreadCrumbs";
import { ReactNode } from "react";
import LoginCheck from "components/organisms/LoginCheck";

type DefaultType = {
    readonly children?: ReactNode;
    readonly contents?: string[][];
    readonly notNav?: boolean;
    readonly loginCheck?: boolean;
};

const Default = ({
    children,
    contents,
    notNav,
    loginCheck = true,
}: DefaultType) => {
    return (
        <>
            <Header notNav={notNav} />
            <main>
                <BreadCrumbs contents={contents} />
                {loginCheck ? (
                    <LoginCheck>{children}</LoginCheck>
                ) : (
                    <>{children}</>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Default;
