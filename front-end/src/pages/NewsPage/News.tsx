import { useEffect } from 'react';
import './News.css';
import { Link } from 'react-router-dom';
import NewsItem from '../../components/NewsItem/NewsItem';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectNews, getNews } from '../../features/newsFeature';
import { useLocation } from 'react-router';

const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);
    const searchNews = useLocation();

    useEffect(() => {
        dispatch(getNews(searchNews.search.substr(10)));
    }, [dispatch, searchNews.search]);

    return (
        <div className="news">
            <div className="newsContainer">
                {
                    news.articles ?
                    news.articles.map((article, index) => {
                        return <NewsItem key={index} article={article} />
                    }) : null
                }
            </div>
            <div className="newsCategories">
                <h3>Danh mục tin tức</h3>
                <ul className="categoryList">
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=technology">Công nghệ</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=health">Sức khỏe</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=sports">Thể thao</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=music">Âm nhạc</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=business">Kinh doanh</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=science">Khoa học</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=entertainment">Giải trí</Link></li>
                    <li className="categoryItem"><i className="fas fa-chevron-right"></i><Link className="link" to="/news?category=politics">Chính trị</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default News;
