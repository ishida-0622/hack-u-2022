import { ReactNode } from "react";
type SpanType = {
    id?: string;
    className?: string;
    children?: ReactNode;
};

const Text = (props: SpanType) => {
    return (
        <span id={props.id} className={props.className}>
            {props.children}
        </span>
    );
};

export default Text;
