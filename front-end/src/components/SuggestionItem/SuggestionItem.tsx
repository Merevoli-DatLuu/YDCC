import './SuggestionItem.css';
import hospitalImage from '../../assets/hospital.jpg';

const SuggestionItem = (props: {hospital: {name: string, address: string, benefit: string, status: string, image: string}}) => {
    return (
        <div className="suggestionsDetails">
            <img src={props.hospital.image} alt="hospital" />
            <ul className="suggestionList">
                <li className="suggestionItem">Tên: <span>{props.hospital.name}</span></li>
                <li className="suggestionItem">Địa chỉ: <span>{props.hospital.address}</span></li>
                <li className="suggestionItem">Mức hưởng: <span>{props.hospital.benefit}</span></li>
                <li className="suggestionItem">Trạng thái: <span>{props.hospital.status}</span></li>
            </ul>
        </div>
    )
}

export default SuggestionItem;
