import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";

const routes: Array<{exact: boolean, path: string, main: any}> = [
    {
        exact: true,
        path: '/',
        main: () => Home
    },
    {
        exact: true,
        path: '/login',
        main: () => Login
    },
    {
        exact: true,
        path: '/register',
        main: () => Register
    },
];

export default routes;