/** @jsxImportSource @emotion/react */
import Link from "components/atoms/Link/Link";
import { css } from "@emotion/react";
import logout from "utils/logout";

const Header = () => {
    return (
        <>
            <header css={HeaderMain}>
                <h1 css={HeaderH1}>
                    <Link href="/" css={HeaderLink}>
                        WAIFU sharing
                    </Link>
                </h1>
                <nav css={HeaderNav}>
                    <ul css={HeaderUl}>
                        <li css={HeaderLi}>
                            <Link href="/post-create" css={HeaderLink}>
                                布教する
                            </Link>
                        </li>
                        <li css={HeaderLi}>
                            <Link href="/foo" css={HeaderLink}>
                                布教される
                            </Link>
                        </li>
                        <li css={HeaderLi}>
                            <Link
                                href="#"
                                css={HeaderLink}
                                onClick={() => logout()}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

const HeaderMain = css({
    padding: "30px 4% 10px 0px",
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
});

const HeaderH1 = css({
    margin: 0,
    paddingLeft: "3%",
    fontSize: "40px",
});

const HeaderNav = css({
    margin: "0 0 0 auto",
    paddingRight: "3%",
});

const HeaderUl = css({
    listStyle: "none",
    margin: 0,
    display: "flex",
});

const HeaderLi = css({
    margin: "0 0 0 15px",
    fontSize: "16px",
});

const HeaderLink = css({
    textDecoration: "none",
    color: "#4b4b4b",
    "&:hover": {
        opacity: 0.5,
    },
});

export default Header;
