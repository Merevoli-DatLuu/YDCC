import { useState } from 'react';
import './Login.css';
import logo from '../../assets/bhxh-logo.jpg';
import { useForm } from "react-hook-form";
import Errors from '../../components/Errors/Errors';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {authLogin} from '../../features/authFeature';

const Login = (history: History) => {
    const [idBHYT, setIdBHYT] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();

    const onSubmit = (loginFormValue: {idBHYT: string, password: string}) => {
        dispatch(authLogin(loginFormValue));
        setIdBHYT("");
        setPassword("");
    };

    const isDisabled = () => {
        if(idBHYT !== "" && password !== "") return false;
        return true;
    };

    return (
        <div className="loginPage">
            <img src={logo} alt="logo" />
            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input 
                        className="form-input"
                        type="text" 
                        placeholder="Mã bảo hiểm y tế"
                        value={idBHYT}
                        {...register("idBHYT", {required: true})}  
                        onChange={e => setIdBHYT(e.target.value)}  
                    />
                </div>
                {errors.idBHYT?.type === 'required' && <Errors error="ID BHYT is required" />}
                <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input 
                        className="form-input"
                        type="password" 
                        placeholder="........." 
                        value={password}
                        // onChange={e => setPassword(e.target.value)}
                        {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/})}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {errors.password && <Errors error="Password must contain at least 1 lowercase-uppercase-special-digital char" />}
                <div className="form-group action">
                    <p>Quên mật khẩu ?</p>
                    <Link className="link" to="/register"><p>Đăng ký tài khoản</p></Link>
                </div>
                <button disabled={isDisabled()} type="submit">Đăng nhập</button>
            </form>
        </div>
    )
}

export default Login;

