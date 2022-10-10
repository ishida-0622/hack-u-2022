/** @jsxImportSource @emotion/react */
import Form from "components/atoms/Form";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Button from "components/atoms/Button";
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
                <h1
                    css={css({
                        fontSize: "40px",
                    })}
                >
                    Signup
                </h1>
                <Input
                    type="text"
                    name="username"
                    placeholder="ユーザーネーム(ID)"
                    required={true}
                    onChange={usernameOnChange}
                    css={css({
                        fontSize: "16px",
                        width: "400px",
                        height: "46px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        border: "gray",
                        ":focus": {
                            outline: "solid 5px skyblue",
                        },
                    })}
                />
                <br />
                <Input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    required={true}
                    onChange={emailOnChange}
                    css={css({
                        fontSize: "16px",
                        width: "400px",
                        height: "46px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        border: "gray",
                        ":focus": {
                            outline: "solid 5px skyblue",
                        },
                    })}
                />
                <br />
                <Input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    minLength={6}
                    required={true}
                    onChange={passwordOnChange}
                    css={css({
                        fontSize: "16px",
                        width: "400px",
                        height: "46px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        border: "gray",
                        ":focus": {
                            outline: "solid 5px skyblue",
                        },
                    })}
                />
                <br />
                <Input
                    type="password"
                    name="re-password"
                    placeholder="パスワード(再入力)"
                    minLength={6}
                    required={true}
                    onChange={repasswordOnChange}
                    css={css({
                        fontSize: "16px",
                        width: "400px",
                        height: "46px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        border: "gray",
                        ":focus": {
                            outline: "solid 5px skyblue",
                        },
                    })}
                />
                <br />
                <Button
                    type="submit"
                    css={css({
                        border: "none",
                        outline: "none",
                        width: "200px",
                        height: "46px",
                        fontSize: "24px",
                        color: "#ffffff",
                        ":hover": {
                            cursor: "pointer",
                            opacity: "0.8",
                        },
                        background: "skyblue",
                        borderRadius: "30px",
                        marginBottom: "10px",
                    })}
                >
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
