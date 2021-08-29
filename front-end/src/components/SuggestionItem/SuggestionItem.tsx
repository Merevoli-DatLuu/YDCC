import './SuggestionItem.css';
import hospitalImage from '../../assets/hospital.jpg';
import { SuggestionModel } from '../../models/suggest-model';

const SuggestionItem = (props: {hospital: SuggestionModel}) => {
    return (
        <div className="suggestionsDetails">
            <img src={hospitalImage} alt="hospital" />
            <ul className="suggestionList">
                <li className="suggestionItem">Tên: <span>{props.hospital.name}</span></li>
                <li className="suggestionItem">Địa chỉ: <span>{props.hospital.address}</span></li>
                <li className="suggestionItem">Mức hưởng: <span>{props.hospital.percent}%</span></li>
                <li className="suggestionItem">Trạng thái: <span>{props.hospital.status}</span></li>
            </ul>
        </div>
    )
}

export default SuggestionItem;
