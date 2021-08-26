import { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../assets/logo_transparent.png';
import { useForm } from "react-hook-form";
import Errors from '../../components/Errors/Errors';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {authLogin, selectAuthLogin, selectAuthError} from '../../features/authFeature';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

const Login = () => {
    const history = useHistory();
    const [idBHYT, setIdBHYT] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const userLogin = useAppSelector(selectAuthLogin);
    const userLoginError = useAppSelector(selectAuthError);

    useEffect(() =>{
        if(userLogin.access_token !== "") {
            localStorage.setItem("YDCC_token", JSON.stringify(userLogin));
            history.push("/");
        }
    }, [userLogin, history]);

    useEffect(() => {
        if(userLoginError === true) {
            store.addNotification({
                title: "Wrong credential!",
                message: "Bạn đã nhập sai mã bảo hiểm hoặc password",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            // let element = document.querySelector(".error");
            // if(!element) {
            //     let error = document.createElement("p");
            //     error.innerHTML = "Wrong credential";
            //     error.style.color = "red";
            //     error.classList.add("error");
            //     let formGroup = document.querySelector("#loginErrorBelow");
            //     formGroup && formGroup.parentNode?.insertBefore(error, formGroup.nextSibling);
            // };
        }
    }, [userLoginError]);

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
        <>
        <ReactNotification id="loginNotification" />
        <div className="loginPage">
            <img id="loginErrorBelow" src={logo} alt="logo" />
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
        </>
    )
}

export default Login;

