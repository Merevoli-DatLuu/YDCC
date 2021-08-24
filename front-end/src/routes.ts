import Account from "./pages/AccountPage/Account";
import Chat from "./pages/ChatPage/Chat";
import ExtendHI from "./pages/ExtendHealthInsurancePage/ExtendHI";
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
    {
        exact: true,
        path: '/chat',
        main: () => Chat
    },
    {
        exact: true,
        path: '/account',
        main: () => Account
    },
    {
        exact: true,
        path: '/account/:id',
        main: () => ExtendHI
    }
];

export default routes;