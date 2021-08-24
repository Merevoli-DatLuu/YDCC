import './Input.css';

const Input = (props: {message: string, setMessage: Function, sendMessage: Function}) => {
    return (
        <form className="form">
            <input type="text" className="input" placeholder="Type a message..." value={props.message} onChange={(e) => props.setMessage(e.target.value)} onKeyPress={(e) => e.key==="Enter" ? props.sendMessage(e) : null} />
            <button className="sendButton" onClick={(e) => props.sendMessage(e)}><i className="far fa-paper-plane"></i></button>
        </form>
    )
}

export default Input;
