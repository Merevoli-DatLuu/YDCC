import { useEffect } from 'react';
import logo from '../../assets/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import profile from '../../assets/profile.png';
import { userLogout, selectAuthLogin } from '../../features/authFeature';
import { selectBHYT, getBHYTInfo } from '../../features/accountFeature';

const Header = () => {
    const dispatch = useAppDispatch();
    const userLogin = useAppSelector(selectAuthLogin);
    let user = localStorage.getItem("YDCC_token");
    const auth = user !== null ? JSON.parse(user) : "";
    const userBHYT = useAppSelector(selectBHYT);

    useEffect(() => {
        if(auth !== "") dispatch(getBHYTInfo(auth.access_token));   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const logout = () => {
        const login = {
            access_token: "",
            refresh_token: "",
            user: {
                pk: 0,
                username: ""
            },
        };
        localStorage.removeItem("YDCC_token");
        localStorage.removeItem("YDCC_account");
        localStorage.removeItem("YDCC_suggestion");
        dispatch(userLogout(login));
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="intro">
                        <h2>Cổng dịch vụ BHYT</h2>
                        <p>Kết nối, cung cấp thông tin và dịch vụ mọi lúc mọi nơi</p>
                    </div>
                </div>
                <div className="auth">
                    {/* <Link to="/register">
                        <button type="button">Đăng ký</button>
                    </Link> */}
                    {
                        (user !== null || userLogin.access_token !== "") ?
                        <div className="userLogin">
                            <Link to="/account">
                                <img src={userBHYT.picture || profile} alt="profile" />
                            </Link>
                            <button type="button" onClick={logout}>Đăng xuất</button>
                        </div> :
                        <Link to="/login">
                            <button type="button">Đăng nhập</button>
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;
