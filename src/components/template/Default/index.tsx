/** @jsxImportSource @emotion/react */
import Header from "components/organisms/Header";
import Footer from "components/organisms/Footer";
import BreadCrumbs from "components/organisms/BreadCrumbs";
import { ReactNode } from "react";
import LoginCheck from "components/organisms/LoginCheck";

type DefaultType = {
    readonly className?: string;
    readonly children?: ReactNode;
    readonly contents?: string[][];
    readonly notNav?: boolean;
    readonly loginCheck?: boolean;
};

const Default = ({
    className,
    children,
    contents,
    notNav,
    loginCheck = true,
}: DefaultType) => {
    return (
        <>
            <Header notNav={notNav} />
            <main className={className}>
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
