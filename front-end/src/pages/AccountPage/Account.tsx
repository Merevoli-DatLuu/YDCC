import { useEffect, useState } from 'react';
import './Account.css';
import profile from '../../assets/profile.png';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectBHYT , selectUser, getInfo, getBHYTInfo, selectBenefit, getBenefit } from '../../features/accountFeature';
import { useHistory, useLocation } from 'react-router';
import { selectAuthLogin } from '../../features/authFeature';
import { Link } from 'react-router-dom';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

const Account = () => {
    const sessionId = useLocation();
    const [id, setId] = useState("");
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const userBHYT = useAppSelector(selectBHYT);
    const userBenefit = useAppSelector(selectBenefit);
    const userLogin = useAppSelector(selectAuthLogin);
    let local = localStorage.getItem("YDCC_account");
    const userLocal = local !== null ? JSON.parse(local) : user;
    const history = useHistory();

    useEffect(() => {
        setId(sessionId.search.substr(12));
        let user = localStorage.getItem("YDCC_token");
        const auth = user !== null ? JSON.parse(user) : "";
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        }else {
            dispatch(getBHYTInfo(auth.access_token));
            dispatch(getInfo(auth.access_token));
            dispatch(getBenefit(auth.access_token));
        };
    }, [dispatch, history, userLogin.access_token, sessionId]);

    useEffect(() => {
        if(id) {
            store.addNotification({
                title: "Wonderful!",
                message: "Bạn đã gia hạn thẻ BHYT thành công",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        };
    }, [id]);

    return (
        <>  
            <ReactNotification id="notification" />
            <div className="account">
                <div className="accountServices">
                    <Link className="link" to={`/account/${userLocal.username}`}>
                        <div className="accountServicesGroup">
                            <i className="fas fa-user-plus"></i>
                            <p>Gia hạn thẻ BHYT</p>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </Link>
                    {/* <span></span>
                    <Link className="link" to={`/account/${userLocal.username}/benefit`}>
                        <div className="accountServicesGroup">
                            <i className="fas fa-user-plus"></i>
                            <p>Thông tin hưởng</p>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </Link> */}
                    <span></span>
                    <Link className="link" to={`/account/${userLocal.username}/records`}>
                        <div className="accountServicesGroup">
                            <i className="fas fa-plus-square"></i>
                            <p>Sổ khám chữa bệnh</p>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </Link>
                    <span></span>
                    <Link className="link" to={`/account/${userLocal.username}/use`}>
                        <div className="accountServicesGroup">
                            <i className="fas fa-id-card"></i>
                            <p>Sử dụng thẻ BHYT</p>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </Link>
                </div>
                <div className="accountSection">
                    <div className="accountInfo">
                        <div className="accountInfoGroup">
                            <img src={userBHYT.picture || profile} alt="avatar" />    
                            {/* <img src="https://toplist.vn/images/800px/dino-studio-anh-vien-cho-be-va-gia-dinh-317623.jpg" alt="profile" /> */}
                            {/* {
                                user.picture !== null ?
                                <img src={userBHYT.picture} alt="avatar" />
                                : <img src={profile} alt="avatar" />
                            } */}
                            <div>
                                <p><strong>{userBHYT.name || userLocal.name}</strong></p>
                                <p>Mã số BHYT: {userBHYT.health_insurance_id || userLocal.username}</p>
                            </div>
                        </div>
                        <span></span>
                        <div className="accountInfoGroup">
                            <p>Ngày sinh</p>
                            <p>{user.date_of_birth || userLocal.date_of_birth}</p>
                        </div>
                        <span></span>
                        <div className="accountInfoGroup">
                            <p>Số điện thoại</p>
                            <p>{userLocal.phone}</p>
                        </div>
                        <span></span>
                        <div className="accountInfoGroup">
                            <p>Địa chỉ Email</p>
                            <p>{userLocal.email}</p>
                        </div>
                        <span></span>
                        <div className="accountInfoGroup">
                            <p>Địa chỉ</p>
                            <p id="address">{userBHYT.address}</p>
                        </div>
                    </div>
                    <div className="accountBenefit">
                        <h3><strong>Thông tin phúc lợi</strong></h3>
                        {
                            userBenefit ?
                            <div>
                                <p><i className="fas fa-chevron-right"></i><span>Mức hưởng 1:</span> {userBenefit.level_1}</p>
                                <p><i className="fas fa-chevron-right"></i><span>Mức hưởng 2:</span> {userBenefit.level_2}</p>
                                <p><i className="fas fa-chevron-right"></i><span>Mức hưởng 3:</span> {userBenefit.level_3}</p>
                                <p><i className="fas fa-chevron-right"></i><span>Mức hưởng 4:</span> {userBenefit.level_4}</p>
                            </div>: null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account;
