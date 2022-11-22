/** @jsxImportSource @emotion/react */
import Form from "components/atoms/Form";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Button from "components/atoms/Button";
import { css } from "@emotion/react";

const LoginForm = ({
    className,
    action,
    buttonText = "Login",
    onSubmit,
    emailOnChange,
    passwordOnChange,
}: {
    readonly className?: string;
    readonly action?: string;
    readonly buttonText?: string;
    readonly onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    readonly emailOnChange?: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    readonly passwordOnChange?: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}) => {
    return (
        <>
            <Form
                css={LoginFormStyle}
                className={className}
                action={action}
                onSubmit={onSubmit}
            >
                <h1
                    css={css({
                        fontSize: "40px",
                    })}
                >
                    Login
                </h1>
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

const LoginFormStyle = css({
    textAlign: "center",
});

export default LoginForm;
