import { ReactNode } from "react";

type CheckBoxType = {
    className?: string;
    defaultChecked?: boolean;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
    children?: ReactNode;
};

const CheckBox = (props: CheckBoxType) => {
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
