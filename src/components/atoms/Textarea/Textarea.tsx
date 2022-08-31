import { ReactNode } from "react";

type TextareaType = {
    readonly className?: string;
    readonly value?: string;
    readonly name?: string;
    readonly placeholder?: string;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly required?: boolean;
    readonly children?: ReactNode;
    readonly onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = (props: TextareaType) => {
    return (
        <textarea
            className={props.className}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            minLength={props.minLength}
            onChange={props.onChange}
            required={props.required}
        >
            {props.children}
        </textarea>
    );
};

export default Textarea;
