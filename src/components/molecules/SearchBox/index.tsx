import Input from "components/atoms/Input";

type SearchBoxType = {
    value: string;
    placeholder?: string;
    inputOnChange?(event: React.ChangeEvent<HTMLInputElement>): void;
};

const SearchBox = (props: SearchBoxType) => {
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
