/** @jsxImportSource @emotion/react */
import Header from "components/organisms/Header";
import Footer from "components/organisms/Footer";
import BreadCrumbs from "components/organisms/BreadCrumbs";
import { ReactNode } from "react";
import LoginCheck from "components/organisms/LoginCheck";
import { css } from "@emotion/react";

const Default = ({
    className,
    children,
    contents,
    notNav,
    loginCheck = true,
}: {
    readonly className?: string;
    readonly children?: ReactNode;
    readonly contents?: string[][];
    readonly notNav?: boolean;
    readonly loginCheck?: boolean;
}) => {
    return (
        <>
            <Header notNav={notNav} />
            <main css={css({ paddingTop: "7%" })} className={className}>
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
