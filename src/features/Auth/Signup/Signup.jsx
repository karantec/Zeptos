import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from '../../../hooks/Auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

import "../../../styles/Signup.css"
import Loader from '../../../components/Loader';
import { useAuth } from '../AuthContext';

function Signup() {
    const navigate = useNavigate();
    const { hasToken } = useAuth();

    useEffect(() => {
        if (hasToken) {
            navigate("/live_market");
        }
    }, [hasToken, navigate]);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [termsValues, setTermsValues] = useState({
        term1: false,
    });

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTermsValues({
            ...termsValues, [name]: checked
        });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{12}$/;

        if (fullName.length < 3) {
            toast.error("Full Name must be at least 3 characters long");
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Email is not valid");
            return false;
        }
        if (!phoneRegex.test(phoneNumber)) {
            toast.error("Phone number must be valid");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        if (address.trim() === '') {
            toast.error("Address cannot be empty");
            return false;
        }
        if (!termsValues.term1) {
            toast.error("terms and conditions must be accepted");
            return false;
        }

        return true;
    };

    const signupSubmitHandler = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const userData = {
            full_name: fullName,
            email: email,
            phone_number: phoneNumber,
            password: password,
            address: address,
        };

        try {
            const response = await fetch(backend_url + '/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const textResponse = await response.text();
            if (!textResponse) {
                throw new Error('Empty response from server');
            }

            const data = JSON.parse(textResponse);
            if (!data.success) {
                toast.error(data.content);
                setIsLoading(false);
            } else {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                navigate('/live_market');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.message === 'Unexpected end of JSON input') {
                toast.error('Server returned an invalid JSON response');
            } else if (error.message === 'Empty response from server') {
                toast.error('Server returned an empty response');
            } else {
                toast.error("Server side error: " + error.message);
            }
        }
    };


    return (
        <div className="signup-body" style={{ marginTop: "-90px" }}>
            <ToastContainer />
            <div className="container signup-container">
                <Link to="/">
                    <img src="/home/bejiness-logo.png" alt="logo" style={{ width: "80px" }} />
                </Link>
                {
                    isLoading ?
                        <Loader />
                        :
                        <form className="form-container signup-form-container" onSubmit={signupSubmitHandler}>
                            <h1>Signup</h1>

                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control signup-form-control"
                                    id="fullName"
                                    placeholder="Full Name"
                                    onChange={handleFullNameChange}
                                    value={fullName}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputEmail3" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control signup-form-control"
                                    id="inputEmail3"
                                    placeholder="Email"
                                    onChange={handleEmailChange}
                                    value={email}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                                <PhoneInput
                                    country={"in"}
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    placeholder="+91 xxxxx-xxxxx"
                                    className="mobile mb-2"
                                    inputProps={{
                                        name: 'Phone Number',
                                        required: true,
                                        autoFocus: true
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputPassword3" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control signup-form-control"
                                    id="inputPassword3"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputAddress3" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control signup-form-control"
                                    id="inputAddress3"
                                    placeholder="Address"
                                    onChange={handleAddressChange}
                                    value={address}
                                    required
                                />
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="term1"
                                    name="term1"
                                    checked={termsValues.term1}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="term1">
                                    <Link to="/terms_and_conditions" target="_blank">
                                        I agree to the terms and conditions
                                    </Link>
                                </label>
                            </div>
                            {/* <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="term2"
                                    name="term2"
                                    checked={termsValues.term2}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="term2">
                                    <Link to="/privacy_and_policy" target="_blank">
                                        I agree to the privacy and policy
                                    </Link>
                                </label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="term3"
                                    name="term3"
                                    checked={termsValues.term3}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="term3">
                                    <Link to="/return_and_policy" target="_blank">
                                        I agree to the return and policy
                                    </Link>
                                </label>
                            </div> */}

                            <div className="mb-3">
                                <button type="submit"
                                    className="btn btn-warning"
                                    style={{ width: '100%' }}
                                >
                                    Register
                                </button>
                            </div>

                            <Link to="/login" className="ms-2">
                                Already have an account?
                            </Link>
                        </form>
                }
            </div>
        </div>
    );
}

export default Signup;
