import './NewsItem.css';
import newsImage from '../../assets/news.jpg';

const NewsItem = (props: {article: any}) => {

    return (
        <div className="newsItem">
            <img src={props.article.urlToImage || newsImage} alt="news" />
            <div className="newsItemContainer">
                <h4><a href={props.article.url} target="blank">{props.article.title}</a></h4>
                <p>{props.article.description || props.article.content}</p>
            </div>
        </div>
    )
}

export default NewsItem;
