/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Footer = () => {
    return (
        <>
            <footer
                css={FooterMain}
            >
                <div
                    css={FooterDiv}
                >
                    <small>
                        © copyright.Built with Firebase
                    </small>
                </div>

            </footer>
        </>
    );
};

const FooterMain = css({
    padding: "30px 0",
    position: "fixed",
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    bottom: 0,
    textAlign: "center",
    float: "left",
    color: "#4b4b4b",
})

const FooterDiv = css({
    margin: "0 auto",
})

export default Footer;
