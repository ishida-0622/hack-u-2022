/** @jsxImportSource @emotion/react */
import { footerMain, footerDiv } from "./style";

const Footer = () => {
    return (
        <footer css={footerMain}>
            <div css={footerDiv}>
                <small>© copyright.Built with Firebase</small>
            </div>
        </footer>
    );
};

export default Footer;
