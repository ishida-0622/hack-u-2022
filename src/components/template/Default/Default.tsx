/** @jsxImportSource @emotion/react */
import Header from "components/organisms/Header/Header";
import Footer from "components/organisms/Footer/Footer";
import BreadCrumbs from "components/organisms/BreadCrumbs/BreadCrumbs";
import { ReactNode } from "react";

type DefaultType = {
    readonly children?: ReactNode;
    readonly contents?: string[][];
    readonly notNav?: boolean;
};

const Default = (props: DefaultType) => {
    return (
        <>
            <Header notNav={props.notNav} />
            <main>
                <BreadCrumbs contents={props.contents} />
                {props.children}
            </main>
            <Footer />
        </>
    );
};

export default Default;
