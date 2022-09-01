import { ReactNode } from "react";

type InputType = {
    readonly id?: string;
    readonly className?: string;
    readonly name?: string;
    readonly value?: string;
    readonly placeholder?: string;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly disabled?: boolean;
    readonly type?:
        | "text"
        | "number"
        | "email"
        | "password"
        | "date"
        | "tel"
        | "checkbox"
        | "radio"
        | "file"
        | "hidden";
    readonly children?: ReactNode;
    readonly required?: boolean;
    readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: InputType) => {
    return (
        <label htmlFor={props.id}>
            <input
                id={props.id}
                className={props.className}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                minLength={props.minLength}
                disabled={props.disabled}
                type={props.type}
                required={props.required}
                onChange={props.onChange}
            >
                {props.children}
            </input>
        </label>
    );
};

export default Input;
