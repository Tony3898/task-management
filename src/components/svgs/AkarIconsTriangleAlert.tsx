import * as React from "react";

const SvgAkarIconsTriangleAlert = (props: { color?: string, width?: number, height?: number, message?: string }) => (
    <React.Fragment>
        <svg
            style={{minWidth: '24px', ...props}}
            width={props.width || 24}
            height={props.height || 24}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 9v5M12 17.5v.5"
                stroke={props.color || "#F65162"}
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M2.232 19.016 10.35 3.052c.713-1.403 2.59-1.403 3.302 0l8.117 15.964C22.45 20.36 21.544 22 20.116 22H3.883c-1.427 0-2.334-1.64-1.65-2.984h-.001Z"
                stroke={props.color || "#F65162"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
        {props.message ? <span className="no-net-icon-text">{props.message}</span> : ''}
    </React.Fragment>
);

export default SvgAkarIconsTriangleAlert;
