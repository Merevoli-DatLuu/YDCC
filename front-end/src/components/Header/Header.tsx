import logo from '../../assets/bhxh-logo.jpg';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
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
                    <Link to="/login">
                        <button type="button">Đăng nhập</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;
