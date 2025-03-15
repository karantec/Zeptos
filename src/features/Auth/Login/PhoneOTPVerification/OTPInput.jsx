import OtpInput, { ResendOTP } from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OTPInput(props) {
    const [otpTime, setOtpTime] = useState(40);
    const [otpCode, setOtpCode] = useState("");
    const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (otpTime > 0) {
            const intervalId = setInterval(() => {
                setOtpTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [otpTime]);

    const OtpInputChangeHandler = (e) => {
        setOtpCode(e);
        console.log(e.length);
        if (e.length === 6) {
            verifyOTP(e);
        }
    }

    const resendOTP = () => {
        // Add your resend OTP logic here
        console.log("Resend OTP");
        props.resendOTP();
        setOtpTime(40);
    }

    const verifyOTP = (code) => {
        if (code === "") {
            alert("Enter the OTP code");
            return;
        }

        if (!window.confirmationResult) {
            alert("Please send the OTP first");
            return;
        }

        setIsVerifyButtonDisabled(true);

        window.confirmationResult
            .confirm(code)
            .then((result) => {
                const user = result.user;
                console.log("OTP verified successfully!", user);
                alert("OTP verified successfully!");
                setIsVerified(true);
                // props.setOTPIsVerified(true)
            })
            .catch((error) => {
                console.error("Error verifying OTP:", error);
                alert("Invalid OTP. Please try again.");
            })
            .finally(() => {
                setOtpCode("");
                setIsVerifyButtonDisabled(false);
            });
    }

    const renderButton = (buttonProps) => {
        return (
            <button {...buttonProps} className="btn btn-outline-success" onClick={resendOTP}>
                {buttonProps.remainingTime !== 0 ? `Please wait for ${buttonProps.remainingTime} sec` : "Resend"}
            </button>
        );
    };

    const renderTime = () => React.Fragment;

    return (
        <>
            {!isVerified ? (
                <>
                    <div className="phone-title">Enter your OTP</div>
                    <div className="phone-subcontainer extra">
                        <div className="phone-filed-otp">
                            <OtpInput
                                value={otpCode}
                                onChange={OtpInputChangeHandler}
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                                autoFocus
                            />
                        </div>
                    </div>
                    <ResendOTP
                        renderButton={renderButton}
                        renderTime={renderTime}
                    />
                </>
            ) : null}
        </>
    );
}
