import { useEffect } from 'react';
import './QRCode.css';
import profile from '../../assets/profile.png'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router';
import { selectAuthLogin } from '../../features/authFeature';
import { getBHYTInfo, selectBHYT } from '../../features/accountFeature';

const QRCode = () => {
    const dispatch = useAppDispatch();
    const userLogin = useAppSelector(selectAuthLogin);
    const userBHYT = useAppSelector(selectBHYT);
    const history = useHistory();

    useEffect(() => {
        let user = localStorage.getItem("YDCC_token");
        const auth = user !== null ? JSON.parse(user) : "";
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        }else {
            dispatch(getBHYTInfo(auth.access_token));
        };
    }, [history, userLogin.access_token, dispatch]);

    return (
        <div className="QRCode">
            <div className="QRContainer">
                <img id="QR" src={userBHYT[0].qr_code} alt="QRCode" />
                <p>{userBHYT[0].health_insurance_id}</p>
                <p>{userBHYT[0].name}</p>
                <img src={userBHYT[0].picture || profile} alt="avatar" />
            </div>
        </div>
    )
}

export default QRCode;
