import {RouterProvider, createBrowserRouter} from "react-router-dom";
import StadiumLayout from "./components/Stadium/Layout";
import MatchLayout from "./components/Match/Container";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/", element: <Home />},
            {path: "/stadium", element: <StadiumLayout />},
            {path: "/match", element: <MatchLayout />},
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
