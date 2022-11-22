/** @jsxImportSource @emotion/react */
import { imgStyle } from "./style";

const ImageInput = (props: {
    readonly className?: string;
    readonly resultImageUrl?: string | null;
    readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div>
            {props.resultImageUrl ? (
                <img css={imgStyle} src={props.resultImageUrl} alt="" />
            ) : (
                <></>
            )}
            <br />
            <label>
                <input type="file" accept="image/*" onChange={props.onChange} />
            </label>
        </div>
    );
};

export default ImageInput;
