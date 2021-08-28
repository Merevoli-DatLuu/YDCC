import './Suggestions.css'

const Suggestions = () => {
    return (
        <div className="suggestions">
            <div className="suggestionsSection">
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" value="best" /> Chế độ tốt nhất
                </div>
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" value="nearest" /> Cơ sở gần nhất
                </div>
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" value="most" /> Số lần khám nhiều nhất
                </div>
            </div>
            <div className="suggestionsResults">
                <table>
                    <thead>
                        <tr>
                            <th>Col 1</th>
                            <th>Col 2</th>
                            <th>Col 3</th>
                            <th>Col 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>dadsfsdf</td>
                            <td>asdfasfaf</td>
                            <td>asfadsf</td>
                            <td>adfasfasfa</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Suggestions;
