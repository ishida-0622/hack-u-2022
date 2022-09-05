/** @jsxImportSource @emotion/react */
import Form from "components/atoms/Form/Form";
import Input from "components/atoms/Input/Input";
import Text from "components/atoms/Text/Text";
import Button from "components/atoms/Button/Button";
import { css } from "@emotion/react";

type LoginFormType = {
    className?: string;
    action?: string;
    buttonText?: string;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    emailOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm = ({
    className,
    action,
    buttonText = "Login",
    onSubmit,
    emailOnChange,
    passwordOnChange,
}: LoginFormType) => {
    return (
        <>
            <Form
                css={LoginFormStyle}
                className={className}
                action={action}
                onSubmit={onSubmit}
            >
                <h1>Login</h1>
                <Input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    required={true}
                    onChange={emailOnChange}
                />
                <br />
                <Input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    required={true}
                    onChange={passwordOnChange}
                />
                <br />
                <Button type="submit">
                    <Text>{buttonText}</Text>
                </Button>
            </Form>
        </>
    );
};

const LoginFormStyle = css({
    textAlign: "center",
});

export default LoginForm;
