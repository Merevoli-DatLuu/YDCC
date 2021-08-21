import { useState } from 'react';
import './Register.css';
import logo from '../../assets/bhxh-logo.jpg';
import { useForm } from "react-hook-form";
import Errors from '../../components/Errors/Errors';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {authRegister} from '../../features/authFeature';

const Register = (history: History) => {
    const [phone, setPhone] = useState("");
    const [idBHYT, setIdBHYT] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();

    const onSubmit = (registerFormValue: {phone: string, idBHYT: string, password: string}) => {
        dispatch(authRegister(registerFormValue));
        setPhone("");
        setIdBHYT("");
        setPassword("");
    };

    const isDisabled = () => {
        if(phone !== "" && idBHYT !== "" && password !== "") return false;
        return true;
    };

    return (
        <div className="registerPage">
            <img src={logo} alt="logo" />
            <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <i className="fas fa-phone"></i>
                    <input 
                        type="text" 
                        placeholder="Số điện thoại" 
                        {...register("phone", {required: true, pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/})}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                {errors.phone && <Errors error="Please fill in the right format of phone number" />}
                <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input 
                        type="text" 
                        placeholder="Mã bảo hiểm y tế" 
                        {...register("idBHYT", {required: true})}
                        value={idBHYT}
                        onChange={e => setIdBHYT(e.target.value)}
                    />
                </div>
                {errors.idBHYT?.type === 'required' && <Errors error="ID BHYT is required" />}
                <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input 
                        type="password"
                        placeholder="........." 
                        {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/})}
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                    />
                </div>
                {errors.password && <Errors error="Password must contain at least 1 lowercase-uppercase-special-digital char" />}
                <div className="form-group action">
                    <Link className="link" to="/login"><p>Đã có tài khoản!</p></Link>
                </div>
                <button disabled={isDisabled()} type="submit">Đăng ký</button>
            </form>
        </div>
    )
}

export default Register;
