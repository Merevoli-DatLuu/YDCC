import { useEffect, useState } from 'react';
import SuggestionItem from '../../components/SuggestionItem/SuggestionItem';
import './Suggestions.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSuggestion, getSuggestions, getNearest } from '../../features/searchFeature';
import { selectAuthLogin } from '../../features/authFeature';
import { SuggestionModel } from '../../models/suggest-model';

const Suggestions = () => {
    const dispatch = useAppDispatch();
    const [radio, setRadio] = useState("best");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const suggestions = useAppSelector(selectSuggestion);
    const userLogin = useAppSelector(selectAuthLogin);
    let suggestLocal = localStorage.getItem("YDCC_suggestion");
    let suggestionList: Array<SuggestionModel> = suggestLocal !== null ? JSON.parse(suggestLocal) : [];

    useEffect(() => {
        let user = localStorage.getItem("YDCC_token");
        const auth = user !== null ? JSON.parse(user) : "";
        if(userLogin.access_token !== "" && user !== null) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
                console.log("Geolocation is not supported by this browser.");
            };
            if(latitude > 0 && longitude > 0) dispatch(getSuggestions({access_token: auth.access_token, latitude, longitude}));
        };
        
    }, [dispatch, userLogin.access_token, latitude, longitude]);

    useEffect(() => {
        let user = localStorage.getItem("YDCC_token");
        const auth = user !== null ? JSON.parse(user) : "";
        if(userLogin.access_token !== "" && user !== null) {
            if(radio === "nearest") dispatch(getNearest({access_token: auth.access_token, latitude, longitude}));
            if(radio === "best") dispatch(getSuggestions({access_token: auth.access_token, latitude, longitude}));
        };
    }, [radio, userLogin.access_token, dispatch, latitude, longitude]);

    const showPosition = (position: any) => {
        console.log("lat" + position.coords.latitude);
        console.log("long" + position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    return (
        <div id="suggestions" className="suggestions">
            <div className="suggestionsSection">
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" checked={radio === "best"} value="best" onChange={e => setRadio(e.target.value)} /> 
                    <label htmlFor="best">Chế độ tốt nhất</label>
                </div>
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" checked={radio === "nearest"} value="nearest" onChange={e => setRadio(e.target.value)} /> 
                    <label htmlFor="nearest">Cơ sở gần nhất</label>
                </div>
            </div>
            <div className="suggestionsResults">
                {
                    (suggestionList.length > 0 || suggestions.length > 0) ?
                    suggestionList.map((hospital: SuggestionModel, index) => {
                        return <SuggestionItem key={index} hospital={hospital} />
                    }): null
                }
                {/* <table>
                    <thead>
                        <tr>
                            <th>Col 1</th>
                            <th>Col 2</th>
                            <th>Col 3</th>
                            <th>Col 4</th>
                            <th>Col 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>dadsfsdf</td>
                            <td>asdfasfaf</td>
                            <td>asfadsf</td>
                            <td>adfasfasfa</td>
                            <td>adfasfasfa</td>
                        </tr>
                    </tbody> 
                </table>*/}

            </div>
        </div>
    )
}

export default Suggestions;
