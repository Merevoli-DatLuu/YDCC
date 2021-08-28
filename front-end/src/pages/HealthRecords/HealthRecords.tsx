import { useEffect } from 'react';
import './HealthRecords.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router';
import { selectAuthLogin } from '../../features/authFeature';
import RecordItem from '../../components/RecordItem/RecordItem';
import { selectHospitals, getHospitals, getHospital, selectHospital} from '../../features/heathRecordsFeature';
import { useLocation } from 'react-router';

const HealthRecords = () => {
    const dispatch = useAppDispatch();
    const search = useLocation();
    const userLogin = useAppSelector(selectAuthLogin);
    const hospitals = useAppSelector(selectHospitals);
    const hospital = useAppSelector(selectHospital);
    const history = useHistory();

    useEffect(() => {
        let user = localStorage.getItem("YDCC_token");
        const auth = user !== null ? JSON.parse(user) : "";
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        }else {
            dispatch(getHospitals(auth.access_token));
            if(search.search) dispatch(getHospital({access_token: auth.access_token, id: search.search.substr(12)}));
        };
    }, [history, userLogin.access_token, dispatch, search.search]);

    return (
        <div className="healthRecords">
            <div className="healthRecordsContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Ngày vào</th>
                            <th>Ngày ra</th>
                            <th>Tên bệnh</th>
                            <th>Chuẩn đoán</th>
                            <th>Điều trị</th>
                            <th>Tên bác sĩ</th>
                            <th>Tên bệnh viện</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hospitals.length > 0 ?
                            hospitals.map((hospital, index) => {
                                return <RecordItem key={index} hospital={hospital} />
                            }): null
                        }
                    </tbody>
                </table>
            </div>
            <div className="healthRecordsDetails">
                <h4>THÔNG TIN CHI TIẾT BỆNH VIỆN</h4>
                {
                    hospital.id !== 0 ?
                    <ul className="detailsList">
                        <li className="deatilsItem">Tên: {hospital.name}</li>
                        <li className="deatilsItem">Địa chỉ: {hospital.address}</li>
                        <li className="deatilsItem">Giấy phép hoạt động: {hospital.license_id}</li>
                        <li className="deatilsItem">Trạng thái: {hospital.status}</li>
                        <li className="deatilsItem">Loại bệnh viện: {hospital.type}</li>
                        <li className="deatilsItem">Chứng chỉ: {hospital.head_certificate}</li>
                    </ul>
                    : null
                }
            </div>
        </div>
    )
}

export default HealthRecords;
