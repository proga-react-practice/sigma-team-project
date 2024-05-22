import {createBrowserRouter} from "react-router-dom";
import StadiumLayout from "../components/Stadium/Layout";
import MatchLayout from "../components/Match/Container";
import RootLayout from "../pages/Root";
import About from "../pages/About";
import Home from "../pages/Home";
import {StadiumSearch} from "../pages/StadiumSearch";
import NotFound from "../pages/NotFound";
import { HOME, STADIUM_ROUTE, MATCH_ROUTE, ABOUT, STADIUM_SEARCH_ROUTE} from "./pathConstants";

const router = createBrowserRouter([
    {
        path: HOME,
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            { path: HOME, element: <Home /> },
            { path: STADIUM_ROUTE, element: <StadiumLayout /> },
            { path: MATCH_ROUTE, element: <MatchLayout /> },
            {path: STADIUM_SEARCH_ROUTE, element: <StadiumSearch />},
            { path: ABOUT, element: <About /> },
        ],
    },
]);

export default router;
