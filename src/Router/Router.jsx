import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LoginRegistration/Login";
import Register from "../Pages/LoginRegistration/Register";
import CreateCase from "../Pages/CreateCase/CreateCase";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "create-case",
                element: <CreateCase></CreateCase>,
            },
        ],
    },
]);

export default router;
