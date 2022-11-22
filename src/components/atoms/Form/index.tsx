import { ReactNode } from "react";

const Form = (props: {
    readonly className?: string;
    readonly name?: string;
    readonly action?: string;
    readonly method?: "GET" | "POST";
    readonly children?: ReactNode;
    readonly onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
    return (
        <form
            className={props.className}
            name={props.name}
            action={props.action}
            method={props.method}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </form>
    );
};

export default Form;
