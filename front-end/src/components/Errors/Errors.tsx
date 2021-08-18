import './Errors.css';

const Errors = (props: {error: string}) => {
    return (
        <span id="errors">{props.error}</span>
    )
}

export default Errors
