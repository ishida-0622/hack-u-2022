import { ReactNode } from "react";

const CheckBox = (props: {
    readonly className?: string;
    readonly defaultChecked?: boolean;
    readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readonly children?: ReactNode;
}) => {
    return (
        <label>
            <input
                type="checkbox"
                className={props.className}
                defaultChecked={props.defaultChecked}
                onChange={props.onChange}
            />
            <span>{props.children}</span>
        </label>
    );
};

export default CheckBox;
