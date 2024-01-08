import {toast} from "react-toastify";
import {ToastBoxInterface} from "../../interfaces/ToastInterfaces.ts";
import SvgCharmCircleTick from "../svgs/CharmCircleTick.tsx";
import SvgAkarIconsTriangleAlert from "../svgs/AkarIconsTriangleAlert.tsx";
import SvgMdiInformationOutline from "../svgs/MdiInformationOutline.tsx";

const ToastBox = ({type, text, options}: ToastBoxInterface) => {
    const handleIcon = () => {
        switch (type) {
            case "success":
                return <SvgCharmCircleTick className="-m-1"/>;
            case "warning":
                return <SvgMdiInformationOutline/>;
            case "info":
                return <SvgMdiInformationOutline/>;
            case "error":
                return <SvgAkarIconsTriangleAlert/>;
            case "default":
                return <SvgMdiInformationOutline/>;
        }
    };

    toast(text, {
        ...options,
        type,
        icon: handleIcon(),
        autoClose: (options && options.autoClose) || 5000,
        hideProgressBar: (options && options.hideProgressBar) || true,
        closeButton: (options && options.closeButton) || false,
        position: (options && options.position) || "bottom-right",
        pauseOnFocusLoss: false,
    });
};
export default ToastBox;
