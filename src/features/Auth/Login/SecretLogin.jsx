import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import '../../../styles/Login.css';
import { backend_url } from '../../../hooks/Auth';
import Loader from "../../../components/Loader"
import { useAuth } from "../AuthContext";
import PhoneOTP from "./PhoneOTPVerification/PhoneOTP";


function SecretLogin() {

    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { hasToken } = useAuth();

    useEffect(() => {
        if (hasToken) {
            navigate("/live_market")
        }
    }, [])

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [OTPIsVerified, setOTPIsVerified] = useState(false);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // const validateForm = () => {
    //     const phoneRegex = /^\d{10}$/;
    //     if (!phoneRegex.test(phoneNumber)) {
    //         toast.error("Phone number must be 10 digits");
    //         return false;
    //     }

    //     if (password.length < 6) {
    //         toast.error("Password must be at least 6 characters long");
    //         return false;
    //     }

    //     return true;
    // };

    const loginSubmitHandler = async (event) => {
        event.preventDefault();

        // if (!validateForm()) {
        //     return;
        // }

        setIsLoading(true);

        const userData = {
            phone_number: phoneNumber,
            password: password
        };

        try {
            const response = await fetch(backend_url + '/api/users/secret-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!data.success) {
                toast.error(data.content);
                setIsLoading(false);
            } else {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setToken(localStorage.getItem("token"));
                }
                navigate('/live_market');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Server side error: " + error.message);
        }
    }

    return (
        <div className="login-body" style={{ marginTop: "-90px" }}>
            <ToastContainer />
            <div className="container login-container">
                <Link to='/'>
                    <img src="/home/bejiness-logo.png" alt="logo" style={{ width: "80px" }} />
                </Link>

                {
                    isLoading ?
                        <Loader />
                        :
                        <form className="form-container mt-2 login-form-container" onSubmit={loginSubmitHandler}>
                            <h1>Login</h1>

                            <label htmlFor="phonenumber" className="mt-3 form-label">Phone Number</label>
                            <PhoneInput
                                country={"in"}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                placeholder="+91 xxxxx-xxxxx"
                                className="mobile mb-3"
                            />

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control login-form-control"
                                    id="inputPassword3"
                                    placeholder="Enter your Password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-warning"
                                    style={{ width: '100%' }}>Log In</button>
                                <Link to="/signup" className="mt-2 d-block text-center">Don't have an account?</Link>
                            </div>
                        </form>
                }


            </div>
            <div id="otpless-login-page"></div>
        </div>
    )
}

export default SecretLogin;