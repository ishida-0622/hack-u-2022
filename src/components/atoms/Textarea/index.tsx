const Textarea = (props: {
    readonly className?: string;
    readonly value?: string;
    readonly rows?: number;
    readonly cols?: number;
    readonly name?: string;
    readonly placeholder?: string;
    readonly maxLength?: number;
    readonly minLength?: number;
    readonly required?: boolean;
    readonly onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
    return (
        <textarea
            className={props.className}
            value={props.value}
            rows={props.rows}
            cols={props.cols}
            name={props.name}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            minLength={props.minLength}
            onChange={props.onChange}
            required={props.required}
        ></textarea>
    );
};

export default Textarea;
