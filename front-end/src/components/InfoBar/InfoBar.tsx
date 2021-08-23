import './InfoBar.css';

const InfoBar = (props: {room: string | string[] | null}) => {
    return (
        <div className="infoBar">
            <div className="infoContainer">
                <h2>{props.room}</h2>
            </div>
        </div>
    )
}

export default InfoBar;
