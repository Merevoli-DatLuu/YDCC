import './RecordItem.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/accountFeature';
import { RecordModel } from '../../models/record-model';

const RecordItem = (props: {hospital: RecordModel}) => {
    const hospital = "1";
    const user = useAppSelector(selectUser);
    let local = localStorage.getItem("YDCC_account");
    const userLocal = local !== null ? JSON.parse(local) : user;


    return (
        <tr>
            <td>{props.hospital.start_date}</td>
            <td>{props.hospital.end_date}</td>
            <td>{props.hospital.symptom}</td>
            <td>{props.hospital.diagnose}</td>
            <td>{props.hospital.treatment}</td>
            <td>{props.hospital.doctor}</td>
            <td><Link className="hospitalName" to={`/account/${userLocal.username}/records?hospitalID=${hospital}`}>{props.hospital.hospital_name}</Link></td>
        </tr>
        
        // <div className="recordItem">
        //     <Link className="link" to={`/account/${userLocal.username}/records?hospitalID=${hospital}`}>
        //         <div className="recordItemContainer">
        //             <h4>{props.hospital.name}</h4>
        //             <p>Hospital Desc</p>
        //         </div>
        //     </Link>
        // </div>
    )
}

export default RecordItem;
