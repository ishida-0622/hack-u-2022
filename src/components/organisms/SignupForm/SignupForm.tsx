/** @jsxImportSource @emotion/react */
import Form from "components/atoms/Form/Form";
import Input from "components/atoms/Input/Input";
import Text from "components/atoms/Text/Text";
import Button from "components/atoms/Button/Button";
import { css } from "@emotion/react";
import React from "react";

type SignupFormType = {
    className?: string;
    action?: string;
    buttonText?: string;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    usernameOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    emailOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    repasswordOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupForm = ({
    className,
    action,
    buttonText = "signup",
    onSubmit,
    usernameOnChange,
    emailOnChange,
    passwordOnChange,
    repasswordOnChange,
}: SignupFormType) => {
    return (
        <>
            <Form
                css={SignupFormStyle}
                className={className}
                action={action}
                onSubmit={onSubmit}
            >
                <h1>Signup</h1>
                <Input
                    type="text"
                    name="username"
                    placeholder="ユーザーネーム(ID)"
                    required={true}
                    onChange={usernameOnChange}
                />
                <br />
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
                    minLength={6}
                    required={true}
                    onChange={passwordOnChange}
                />
                <br />
                <Input
                    type="password"
                    name="re-password"
                    placeholder="パスワード(再入力)"
                    minLength={6}
                    required={true}
                    onChange={repasswordOnChange}
                />
                <br />
                <Button type="submit">
                    <Text>{buttonText}</Text>
                </Button>
            </Form>
        </>
    );
};

const SignupFormStyle = css({
    textAlign: "center",
});

export default SignupForm;
