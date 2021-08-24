import { useEffect } from 'react';
import { useHistory } from 'react-router';
import './ExtendHI.css';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { processToCheckOut, selectCheckout } from '../../features/checkoutFeature';
import { selectAuthLogin } from '../../features/authFeature';

const ExtendHI = () => {
    const history = useHistory();
    const param: {id: string} = useParams();
    const userLogin = useAppSelector(selectAuthLogin);
    let local = localStorage.getItem("YDCC_account");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const userLocal = local !== null ? JSON.parse(local) : {};
    const dispatch = useAppDispatch();
    const checkoutInfo = useAppSelector(selectCheckout);

    useEffect(() => {
        let user = localStorage.getItem("YDCC_token");
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        };
    }, [history, userLogin]);

    const checkout = () => {
        const checkoutContent = {
            "username": param.id,
            "name": userLocal.name,
            "date_of_birth": userLocal.date_of_birth,
            "email": userLocal.email,
            "phone": userLocal.phone,
            "cash": 500000
        };
        dispatch(processToCheckOut(checkoutContent));
    };

    const search = () => {
        let card: any = document.querySelector(".cardInfo");
        let checkout: any = document.querySelector(".checkoutInfo");
        let dividers: any = document.querySelectorAll("#divider");
        if(card?.style.display === "" || card?.style.display === "none") card.style.display = "block";
        if(checkout?.style.display === "" || checkout?.style.display === "none") checkout.style.display = "block";
        dividers.forEach((divider: any) => {
            if(divider?.style.display === "" || divider?.style.display === "none") divider.style.display = "block";
        });
    };

    return (
        <div className="extend">
            <h1>Gia hạn thẻ BHYT theo hộ gia đình</h1>
            <div className="extendDetails">
                <form className="formExtend">
                    <div className="formExtend-group">
                        <label>Mã thẻ BHYT</label>
                        <input className="formExtendInput" type="text" value={param.id} onChange={e => e.target.value} disabled={true} />
                    </div>
                    <div className="formExtend-group">
                        <label>Số tháng gia hạn</label>
                        <select className="formExtendSelect">
                            <option value="3">3 tháng</option>
                            <option value="6">6 tháng</option>
                            <option value="9">9 tháng</option>
                            <option value="12">12 tháng</option>
                        </select>
                    </div>
                </form>
                <button onClick={search}>Tra cứu</button>
            </div>
            <div id="divider" className="w3-container w3-center w3-animate-top"></div>
            <div className="cardInfo w3-container w3-center w3-animate-top">
                <h3>Thông tin thẻ gia hạn</h3>
                <div className="cardId">
                    <p>Mã thẻ BHYT:</p>
                    <p>{param.id}</p>
                </div>
                <div className="cardName">
                    <p>Họ và tên:</p>
                    <p>{userLocal.name}</p>
                </div>
                <div className="cardValue">
                    <p>Giá trị thẻ BHYT:</p>
                </div>
                <div className="cardDate">
                    <div id="dateFrom">
                        <p>Từ ngày:</p>
                        <p>2000-01-01</p>
                    </div>
                    <div id="dateTo">
                        <p>Đến ngày:</p>
                        <p>2021-01-01</p>
                    </div>
                </div>
            </div>
            <div id="divider" className="w3-container w3-center w3-animate-top"></div>
            <div className="checkoutInfo w3-container w3-center w3-animate-top">
                <h3>Thông tin thanh toán</h3>
                <div className="checkoutCash">
                    <p>Số tiền nộp BHYT:</p>
                    <p>500.000 VNĐ</p>
                </div>
                <div className="checkoutUnit">
                    <p>Cơ quan cấp thẻ BHYT:</p>
                    <p>Bảo hiểm y tế TP. Hồ Chí Minh</p>
                </div>
                <div className="checkoutAction">
                    <button onClick={checkout}>Thanh toán</button>
                </div>
            </div>
        </div>
    )
}

export default ExtendHI;
