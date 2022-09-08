import { ReactNode } from "react";
type SpanType = {
    id?: string;
    className?: string;
    onClick?(event: React.MouseEvent<HTMLSpanElement>): void;
    children?: ReactNode;
};

const Text = (props: SpanType) => {
    return (
        <span id={props.id} className={props.className} onClick={props.onClick}>
            {props.children}
        </span>
    );
};

export default Text;
