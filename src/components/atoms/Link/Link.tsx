import React, { ReactNode } from "react";

type LinkType = {
    readonly className?: string;
    readonly href?: string;
    readonly target?: "_self" | "_blank" | "_top" | "_parent";
    readonly download?: boolean;
    readonly children?: ReactNode;
    readonly onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Link = (props: LinkType) => {
    return (
        <a
            className={props.className}
            href={props.href}
            target={props.target}
            download={props.download}
            onClick={props.onClick}
        >
            {props.children}
        </a>
    );
};

export default Link;
