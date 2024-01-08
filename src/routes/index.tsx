import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppLayout from "../pages/_layout";
import React, {Suspense} from "react";
import Box from "@mui/material/Box";
import Loader from "../components/wrapper/loader.tsx";

const AppRoute = React.lazy(() => import("./route"));
const AppContainer = () => {
    return (
        <Router>
            <Routes>
                <Route
                    caseSensitive
                    path={"*"}
                    element={
                        <AppLayout>
                            <Suspense
                                fallback={
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
                                         height={'100vh'} width={'100vw'}>
                                        <Loader/>
                                    </Box>
                                }
                            >
                                <AppRoute/>
                            </Suspense>
                        </AppLayout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppContainer;
