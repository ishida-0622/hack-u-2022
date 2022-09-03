type ImageType = {
    className?: string;
    imageUrl: string;
    alt?: string;
    width?: number;
    height?: number;
};

const Image = (props: ImageType) => {
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
