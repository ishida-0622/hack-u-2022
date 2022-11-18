/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import { buttonStyle } from "./style";

const Button = (props: {
    readonly className?: string;
    readonly name?: string;
    readonly value?: string;
    readonly disabled?: boolean;
    readonly type?: "submit" | "reset" | "button";
    readonly children?: ReactNode;
    readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    readonly onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    readonly onMouseOver?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    readonly onMouseOut?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
    return (
        <button
            className={props.className}
            type={props.type}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
            onClick={props.onClick}
            onFocus={props.onFocus}
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
            css={buttonStyle}
        >
            {props.children}
        </button>
    );
};

export default Button;
