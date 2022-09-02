type SpanType = {
    id?: string;
    className?: string;
    text?: string | number;
};

const Text = (props: SpanType) => {
    return (
        <span id={props.id} className={props.className}>
            {props.text}
        </span>
    );
};

export default Text;
