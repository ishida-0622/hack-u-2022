/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
type ImageInputType = {
    className?: string;
    resultImageUrl?: string | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageInput = (props: ImageInputType) => {
    return (
        <div>
            <img
                css={css({
                    maxWidth: "30%",
                    height: "10rem",
                    width: "auto",
                })}
                src={props.resultImageUrl ? props.resultImageUrl : undefined}
                alt=""
            />
            <br />
            <label>
                <input type="file" accept="image/*" onChange={props.onChange} />
            </label>
        </div>
    );
};

export default ImageInput;
