import {Navigate, useLocation} from "react-router";
import {useEffect} from "react";
import ToastBox from "../wrapper/toastBox.tsx";

const PageNotFound = () => {
    const location = useLocation();
    const {search, hash} = location;
    useEffect(() => {
        ToastBox({
            type: "warning",
            text: "Page not found, redirecting to home page",
        });
    }, []);
    return (
        <Navigate to={{pathname: "/", search, hash}} state={{...location}}/>
    );
};

export default PageNotFound;
