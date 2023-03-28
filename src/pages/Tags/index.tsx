/** @jsxImportSource @emotion/react */
import { useState, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Default from "components/template/Default";
import { css } from "@emotion/react";
import Text from "components/atoms/Text";
import { Link, useLocation } from "react-router-dom";
import AddTagModalWindow from "components/organisms/AddTagModalWindow";
import ShowTag from "./ShowTag";

const Tags = () => {
    document.title = "タグ一覧";
    const [modalIsOpen, setIsOpen] = useState(false);
    const search = useLocation().search;
    const [mode, setMode] = useState<string | null>(null);
    useLayoutEffect(() => {
        setMode(new URLSearchParams(search).get("mode"));
    }, [search]);

    return (
        <Default
            contents={[
                ["/", "TOP"],
                ["/#", "タグ一覧"],
            ]}
        >
            <div css={css({ textAlign: "center" })}>
                <Tabs
                    onSelect={(i) =>
                        setMode(
                            i === 0 ? "all" : i === 1 ? "follow" : "not_follow"
                        )
                    }
                >
                    <TabList>
                        <Tab>全て</Tab>
                        <Tab>フォロー中</Tab>
                        <Tab>未フォロー</Tab>
                    </TabList>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                    {mode === "follow" ? (
                        <ShowTag mode="follow" />
                    ) : mode === "not_follow" ? (
                        <ShowTag mode="notFollow" />
                    ) : (
                        <ShowTag mode="all" />
                    )}
                </Tabs>
                <div>
                    <Text>
                        推しが見つからない場合は
                        <Link
                            to=""
                            css={css({ ":hover": { cursor: "pointer" } })}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(true);
                            }}
                        >
                            こちら
                        </Link>
                    </Text>
                </div>
                <AddTagModalWindow isOpen={modalIsOpen} setIsOpen={setIsOpen} />
            </div>
        </Default>
    );
};

export default Tags;
