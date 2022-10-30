import Input from "components/atoms/Input";

const SearchBox = (props: {
    value: string;
    placeholder?: string;
    inputOnChange?(event: React.ChangeEvent<HTMLInputElement>): void;
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
