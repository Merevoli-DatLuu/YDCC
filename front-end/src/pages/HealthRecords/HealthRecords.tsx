import { useEffect } from 'react';
import './HealthRecords.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useHistory } from 'react-router';
import { selectAuthLogin } from '../../features/authFeature';
import RecordItem from '../../components/RecordItem/RecordItem';
import { selectHospitals, getHospitals, getHospital, selectHospital} from '../../features/heathRecordsFeature';
import { useLocation } from 'react-router';
import hospitalImage from '../../assets/hospital.jpg';

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
            {
                hospital.id !== 0 ?
                <div className="healthRecordsDetails">
                    {/* <h4>THÔNG TIN CHI TIẾT BỆNH VIỆN</h4> */}
                    <img src={hospitalImage} alt="hospital" />
                    <ul className="detailsList">
                        <li className="detailsItem">Tên: <span>{hospital.name}</span></li>
                        <li className="detailsItem">Địa chỉ: <span>{hospital.address}</span></li>
                        <li className="detailsItem">Giấy phép hoạt động: <span>{hospital.license_id}</span></li>
                        <li className="detailsItem">Trạng thái: <span>{hospital.status}</span></li>
                        <li className="detailsItem">Loại bệnh viện: <span>{hospital.type}</span></li>
                        <li className="detailsItem">Chứng chỉ: <span>{hospital.head_certificate}</span></li>
                    </ul>
                </div> : null
            }
            
        </div>
    )
}

export default HealthRecords;
