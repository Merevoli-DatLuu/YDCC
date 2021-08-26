import { useState, useEffect } from 'react';
import './Register.css';
import logo from '../../assets/logo_transparent.png';
import { useForm } from "react-hook-form";
import Errors from '../../components/Errors/Errors';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {authRegister, selectAuthRegister} from '../../features/authFeature';

const Register = () => {
    const [phone, setPhone] = useState("");
    const [idBHYT, setIdBHYT] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const userRegister = useAppSelector(selectAuthRegister);
    // const loading = useAppSelector(selectAuthLoading);
    const history = useHistory();

    useEffect(() => {
        if(userRegister.detail !== "") {
            // eslint-disable-next-line no-restricted-globals
            let verifyEmail = confirm("Please verify your email");
            if(verifyEmail === true) {
                window.open(`https://mail.google.com/mail/u/0/#search/from:${email}`, "_blank");
                history.push("/login");
            };
        }
    }, [userRegister, history, email]);

    const onSubmit = (registerFormValue: {idBHYT: string, email: string, password: string, confirmPassword: string, name: string, dateOfBirth: string, phone: string}) => {
        if(password === confirmPassword) {
            dispatch(authRegister(registerFormValue));
            setPhone("");
            setIdBHYT("");
            setName("");
            setPassword("");
            setConfirmPassword("");
            setDateOfBirth("");
            setEmail("");
        }else {
            let element = document.querySelector(".error");
            if(!element) {
                let error = document.createElement("p");
                error.innerHTML = "Confirm password must match your password above";
                error.style.color = "red";
                error.classList.add("error");
                let formGroup = document.querySelector(".confirm .form-group");
                formGroup && formGroup.parentNode?.insertBefore(error, formGroup.nextSibling);
            };
        };
    };

    const isDisabled = () => {
        if(phone !== "" && name !== "" && confirmPassword !== "" && email !== "" && dateOfBirth !== "" && idBHYT !== "" && password !== "") return false;
        return true;
    };

    return (
        <div className="registerPage">
            <img src={logo} alt="logo" />
            <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
            
                <div className="form-group">
                    <i className="far fa-id-card"></i>
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
                    <i className="fas fa-envelope-square"></i>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        {...register("email", {required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                {errors.email && <Errors error="Please fill in the right format of email" />}
                <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input 
                        type="password"
                        placeholder="........." 
                        {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/})}
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                    />
                </div>
                {errors.password && <Errors error="Password must contain at least 1 lowercase-uppercase-special-digital char" />}
                <div className="confirm">
                    <div className="form-group">
                        <i className="fas fa-lock"></i>
                        <input 
                            type="password"
                            placeholder="Confirm Password" 
                            {...register("confirmPassword", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/})}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}    
                        />
                    </div>
                    {errors.confirmPassword && <Errors error="Confirm password must match your password above" />}
                </div>
                <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input 
                        type="text" 
                        placeholder="Tên đăng nhập" 
                        {...register("name", {required: true})}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                {errors.name?.type === 'required' && <Errors error="Name is required" />}
                <div className="form-group">
                    <i className="fas fa-calendar-week"></i>
                    <input 
                        type="text" 
                        placeholder="Ngày tháng năm sinh" 
                        {...register("dateOfBirth", {required: true, pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/})}
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                    />
                </div>
                {errors.dateOfBirth && <Errors error="Please fill in the right format of date (yyyy-mm-dd)" />}
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
               
                <div className="form-group action">
                    <Link className="link" to="/login"><p>Đã có tài khoản!</p></Link>
                </div>
                <button disabled={isDisabled()} type="submit">Đăng ký</button>

            </form>
        </div>
    )
}

export default Register;
