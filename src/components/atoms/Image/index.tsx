const Image = (props: {
    readonly className?: string;
    readonly imageUrl: string | undefined;
    readonly alt?: string;
    readonly width?: number | string;
    readonly height?: number | string;
}) => {
    return (
        <img
            className={props.className}
            src={props.imageUrl}
            alt={props.alt}
            width={props.width}
            height={props.height}
        />
    );
};

export default Image;
