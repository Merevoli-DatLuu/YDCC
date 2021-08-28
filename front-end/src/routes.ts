import Account from "./pages/AccountPage/Account";
import Chat from "./pages/ChatPage/Chat";
import ExtendHI from "./pages/ExtendHealthInsurancePage/ExtendHI";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import News from "./pages/NewsPage/News";
import QRCode from "./pages/QRCodePage/QRCode";
import Register from "./pages/RegisterPage/Register";
import Search from "./pages/SearchPage/Search";
import Suggestions from "./pages/SuggestionsPage/Suggestions";

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
        path: '/search',
        main: () => Search
    },
    {
        exact: true,
        path: '/news',
        main: () => News
    },
    {
        exact: true,
        path: '/account',
        main: () => Account
    },
    {
        exact: true,
        path: '/suggestions',
        main: () => Suggestions
    },
    {
        exact: true,
        path: '/account/:id',
        main: () => ExtendHI
    },
    {
        exact: true,
        path: '/account/:id/use',
        main: () => QRCode
    },
    {
        exact: true,
        path: '/account/:id/records',
        main: () => HealthRecords
    }
];

export default routes;