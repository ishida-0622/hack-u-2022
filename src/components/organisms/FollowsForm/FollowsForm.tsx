/** @jsxImportSource @emotion/react */
import Button from "components/atoms/Button/Button";
import Link from "components/atoms/Link/Link";
import { css } from "@emotion/react";

type FollowsFormType = {
    className?: string;
    tag?: string;
    onAddClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onUnfollowClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    onEditClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
};

const FollowsForm = (props: FollowsFormType) => {
    return (
        <>
            <table
                className={props.className}
                css={css({
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "20px",
                    maxWidth: "350px",
                })}
            >
                <tr>
                    <th colSpan={3}>
                        <Link
                            css={css({
                                float: "left",
                                color: "#6bb6ff",
                                backgroundColor: "white",
                                margin: "5px",
                                padding: 5,
                                border: "solid",
                                // borderColor: "#258fb8",
                                borderRadius: 10,
                            })}
                            href={"/bar?tag=" + props.tag}
                            target="_blank"
                        >
                            #{props.tag}
                        </Link>
                    </th>
                </tr>
                <tr>
                    <td>
                        <button
                            css={css({
                                display: "block",
                                marginLeft: "10px",
                                marginRight: "auto",
                                color: "#FFFFFF",
                                backgroundColor: "#FF4F50",
                                borderRadius: 10,
                                border: "none",
                            })}
                            onClick={props.onUnfollowClick}
                            value={props.tag}
                        >
                            フォローを
                            <br />
                            解除する
                        </button>
                    </td>
                    <td
                        css={css({
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        })}
                    >
                        <Button
                            css={css({
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            })}
                            onClick={props.onAddClick}
                            value={props.tag}
                        >
                            おすすめを
                            <br />
                            新規追加する
                        </Button>
                    </td>
                    <td>
                        <Button
                            css={css({
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            })}
                            onClick={props.onEditClick}
                            value={props.tag}
                        >
                            おすすめを
                            <br />
                            編集する
                        </Button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default FollowsForm;
