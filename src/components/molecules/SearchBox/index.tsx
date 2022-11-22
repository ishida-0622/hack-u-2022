import Input from "components/atoms/Input";

const SearchBox = (props: {
    readonly value: string;
    readonly placeholder?: string;
    readonly inputOnChange?: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}) => {
    return (
        <div>
            <Input
                type="text"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.inputOnChange}
            ></Input>
        </div>
    );
};

export default SearchBox;
