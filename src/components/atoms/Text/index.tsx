import { ReactNode } from "react";

const Text = (props: {
    readonly id?: string;
    readonly className?: string;
    readonly onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    readonly children?: ReactNode;
}) => {
    return (
        <span id={props.id} className={props.className} onClick={props.onClick}>
            {props.children}
        </span>
    );
};

export default Text;
