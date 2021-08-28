import { useEffect } from 'react';
import SuggestionItem from '../../components/SuggestionItem/SuggestionItem';
import './Suggestions.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSuggestion, getSuggestions } from '../../features/searchFeature';
import { selectAuthLogin } from '../../features/authFeature';

const Suggestions = () => {
    const dispatch = useAppDispatch();
    const suggestions = useAppSelector(selectSuggestion);
    const userLogin = useAppSelector(selectAuthLogin);

    useEffect(() => {
        let user = localStorage.getItem("YDCC_token");
        const auth = user !== null ? JSON.parse(user) : "";
        if(userLogin.access_token !== "" && user !== null) {
            dispatch(getSuggestions(auth.access_token));
        };
    }, [dispatch, userLogin.access_token]);

    const hospitalList = [
        {
            name: "Bệnh viện nhân dân 115",
            address: "527 Sư Vạn Hạnh – Phường 12 – Quận 10",
            benefit: "80%",
            status: "Đang hoạt động",
            image: "https://tracuudichvu.com/wp-content/uploads/2021/08/benh-vien-nhan-dan-115.jpg",
        },
        {
            name: "Bệnh viện Thống Nhất",
            address: "01 Lý Thường Kiệt – Phường 7 - Quận Tân Bình",
            benefit: "80%",
            status: "Đang hoạt động",
            image: "https://thuthuat.taimienphi.vn/cf/Images/tt/2019/12/5/benh-vien-thong-nhat-tp-hcm.jpg"
        },
        {
            name: "Bệnh viện 175",
            address: "786 Nguyễn Kiệm- P. 3- Q. Gò vấp",
            benefit: "80%",
            status: "Đang hoạt động",
            image: "https://thuocdantoc.vn/wp-content/uploads/2019/01/benh-vien-175-1.jpg"
        },
        {
            name: "Bệnh viện đa khoa Bưu Điện",
            address: "Lô B đường Thành Thái - P15- Quận 10 ",
            benefit: "48%",
            status: "Đang hoạt động",
            image: "https://media.foody.vn/res/g11/106762/prof/s/foody-mobile-bv-dk-bd-2-jpg-598-635624561501262294.jpg"
        },
        {
            name: "Bệnh viện Nguyễn Trãi",
            address: "314 Nguyễn Trãi – Phường 8 – Quận 5",
            benefit: "48%",
            status: "Đang hoạt động",
            image: "https://vivita.vn/wp-content/uploads/2021/07/benh-vien-nguyen-trai.jpg"
        },
        {
            name: "Bệnh viện Nhân dân Gia Định",
            address: "01 Nơ Trang Long – Phường 7 – Q.Bình Thạnh ",
            benefit: "32%",
            status: "Đang hoạt động",
            image: "https://photo-cms-sggp.zadn.vn/w580/Uploaded/2021/bpivpawv/2021_06_13/bvgiadinh1_jdhk.jpg"
        }
    ];

    return (
        <div className="suggestions">
            <div className="suggestionsSection">
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" value="best" checked /> 
                    <label htmlFor="best">Chế độ tốt nhất</label>
                </div>
                <div className="suggestionsGroup">
                    <input name="suggest" type="radio" value="nearest" /> 
                    <label htmlFor="nearest">Cơ sở gần nhất</label>
                </div>
            </div>
            <div className="suggestionsResults">
                {
                    hospitalList.length > 0 ?
                    hospitalList.map((hospital, index) => {
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
