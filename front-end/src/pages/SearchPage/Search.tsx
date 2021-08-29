import { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './Search.css';

const Search = () => {
    // const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    // const searchResults = useAppSelector(selectSearchResult);

    // const searchInfo = () => {
    //     dispatch(searchItem(search));
    // };

    return (
        <div className="search">
            <div className="searchSection">
                <input type="text" placeholder="Nhập từ khóa tìm kiếm" value={search} onChange={e => setSearch(e.target.value)} />
                {/* <button onClick={searchInfo}><i className="fas fa-search"></i></button> */}
            </div>
            <div className="resultSection">
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

export default Search;
