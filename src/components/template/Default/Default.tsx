/** @jsxImportSource @emotion/react */
import Header from "components/organisms/Header/Header";
import Footer from "components/organisms/Footer/Footer";
import { ReactNode } from 'react';

type DefaultType = {
	readonly children?: ReactNode;
};

const Default = (props: DefaultType) => {
	return (
        <>
			<Header />
            <main>{props.children}</main>
            <Footer />
        </>
	);
};

export default Default;
