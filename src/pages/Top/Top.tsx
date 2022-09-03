/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Textarea from "components/atoms/Textarea/Textarea";
import { useState } from "react";
import Button from "components/atoms/Button/Button";
import Text from "components/atoms/Text/Text";

const Top = () => {
    const [txt, setTxt] = useState("");
    return (
        <div
            css={css({
                textAlign: "center",
            })}
        >
            <h1>Top</h1>
            <h2>test</h2>
            <Textarea
                css={style}
                value={txt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setTxt(e.target.value)
                }
            ></Textarea>
            <br />
            <Button
                css={buttonCss}
                value="click"
                onClick={() => setTxt("")}
                children={"reset"}
            />
            <br />
            <Text text={txt}></Text>
        </div>
    );
};

const style = css({
    textAlign: "center",
    color: "#f00",
    backgroundColor: "#aaa",
});

const buttonCss = css({
    backgroundColor: "#0f0",
});

export default Top;