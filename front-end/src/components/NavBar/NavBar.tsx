import './NavBar.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAuthLogin } from '../../features/authFeature';

const NavBar = () => {
    const userLogin = useAppSelector(selectAuthLogin);
    let user = localStorage.getItem("YDCC_token");

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-list">
                    <Link className="link" to="/">
                        <li className="nav-listItem">
                            {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg> */}
                            <i className="fas fa-home"></i>
                        </li>
                    </Link>
                    {
                        (user === null && userLogin.access_token === "") ?
                        (<>
                            <li className="nav-listItem">Giới thiệu</li>
                            <li className="nav-listItem"><Link className="link" to="/news">Tin tức</Link></li>
                            <li className="nav-listItem"><Link className="link" to="/suggestions">Gợi ý nơi khám</Link></li>
                            {/* <li className="nav-listItem"><Link className="link" to="/search">Tra cứu thông tin</Link></li> */}
                            <li className="nav-listItem">Liên hệ</li>
                        </>):
                        (
                            ((user !== null || userLogin.access_token !== "") && userLogin.user.is_staff === true) ?
                            <></> :
                            <>
                                <li className="nav-listItem">Giới thiệu</li>
                                <li className="nav-listItem"><Link className="link" to="/news">Tin tức</Link></li>
                                <li className="nav-listItem"><Link className="link" to="/suggestions">Gợi ý nơi khám</Link></li>
                                {/* <li className="nav-listItem"><Link className="link" to="/search">Tra cứu thông tin</Link></li> */}
                                <li className="nav-listItem">Liên hệ</li>
                            </>
                        )
                    }
                    
                    <li className="nav-listItem"><Link className="link" to="/chat">Hỏi-đáp</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
