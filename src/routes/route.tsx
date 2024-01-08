import {Route, Routes} from "react-router-dom";
import {allRoute} from "../constants/routes.ts";
import PageNotFound from "../components/misc/pageNotFound.tsx";
import React from "react";

export default function AppRoute() {
    return (
        <Routes>
            {
                allRoute.map(r => <Route key={r.path} index={r.index} path={r.path}
                                         element={React.createElement(r.element)}/>)
            }
            <Route path={"*"} element={<PageNotFound/>}/>
        </Routes>
    );
}
