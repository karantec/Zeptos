import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import "../../styles/SellerContract.css"
import PageLayout, { RefreshUser } from "../../components/PageLayout";
import { backend_url } from "../../hooks/Auth";
import Loader from "../../components/Loader";
import Step1 from "./Steps/step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";


const StepProgressBar = ({ steps, currentStep }) => {
    return (
        <div className="step-progress-bar">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${index + 1 <= currentStep ? 'active' : ''}`}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

export default function SellerContract() {
    const [userData, setUserData] = useState({});
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessPincode, setBusinessPincode] = useState('');
    const [businessLicenseType, setBusinessLicenseType] = useState('');
    const [businessLicenseImage, setBusinessLicenseImage] = useState('');
    const [proprietorDocumentType, setProprietorDocumentType] = useState('');
    const [proprietorDocumentImage, setProprietorDocumentImage] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [reEnterAccountNumber, setReEnterAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [businessType, setBusinessType] = useState('Wholesaler');
    const [wholesalerOptions, setWholesalerOptions] = useState({
        stockiest: false,
        singleCategory: false,
        singleBrand: false,
    });
    const [manufacturerOptions, setManufacturerOptions] = useState({
        oem: false,
        odm: false,
        others: false,
    });

    const [otherBusinessType, setOtherBusinessType] = useState('');
    const [productionCapabilities, setProductionCapabilities] = useState('');
    const [addons, setAddons] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [termsValues, setTermsValues] = useState({
        term1: false,
    });

    const steps = ["Business Information", "Business License & Proprietor Information", "Bank Details", "Business Details", "Terms & Conditions"];

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };

    const handlePrevStep = () => {
        setStep((prev) => prev - 1);
    };

    const isFormValid = () => {
        return companyName && businessAddress && businessPincode && businessLicenseType && businessLicenseImage && proprietorDocumentType && proprietorDocumentImage && bankName && accountNumber && reEnterAccountNumber && accountType && ifscCode && businessCategory && specialization && businessType && termsValues.term1;
    };


    const handleWholesalerOptionChange = (option) => {
        setWholesalerOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const handleManufacturerOptionChange = (option) => {
        setManufacturerOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    
    const proprietorDocumentImageHandler = (e) => {

        const file = e.target.files[0];
        // console.log(file);

        const reader = new FileReader();
        
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProprietorDocumentImage(reader.result)
                // console.log(reader.result);
            }
        };

        reader.readAsDataURL(file);
    }

    const businessLicenseImageHandler = (e) => {

        const file = e.target.files[0];
        // console.log(file);

        const reader = new FileReader();
        
        reader.onload = () => {
            if (reader.readyState === 2) {
                setBusinessLicenseImage(reader.result)
                // console.log(reader.result);
            }
        };

        reader.readAsDataURL(file);
    }


    const SellerContractHandler = async () => {

        setIsLoading(true)

        var PostData = {
            companyName,
            businessAddress,
            businessPincode,
            businessLicenseType,
            proprietorDocumentType,
            bankName,
            accountNumber,
            accountType,
            ifscCode,
            businessCategory,
            specialization,
            businessType,
            otherBusinessType,
            wholesalerOptions,
            manufacturerOptions,
            productionCapabilities,
            addons,
            businessLicenseImage,
            proprietorDocumentImage
        }

        const token = localStorage.getItem("token");

        await fetch(backend_url + '/api/users/make-seller', {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(PostData),
        })
            .then((response) => {
                response.json().then((data) => {
                    if (data.success == false) {
                        toast.error(data.content)
                        setIsLoading(false)
                    } else {
                        RefreshUser();
                        navigate('/live_market');
                    }
                });
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error("server side error: ", error.content)
                return <p>{error.message}</p>;
            });
    }

    return (
        <PageLayout>
            <ToastContainer />
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#050a30",  // Dark Blue
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    padding: "10px 0",
                    background: "linear-gradient(90deg, #ffb12c, #f9fafd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Become A Seller
            </h2>
            {isLoading ? (
                <Loader />
            ) : (

                (userData.account_type == "requested") ?
                    <>
                        <h1>Kindly wait for KYC verification, <br />once finished you can have access to Seller Console.</h1>
                    </>
                    :
                    <div className="container mt-1">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <StepProgressBar steps={steps} currentStep={step} />

                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        {step === 1 && (
                                            <Step1
                                                companyName={companyName}
                                                businessAddress={businessAddress}
                                                businessPincode={businessPincode}
                                                setCompanyName={setCompanyName}
                                                setBusinessAddress={setBusinessAddress}
                                                setBusinessPincode={setBusinessPincode}
                                                handleNextStep={handleNextStep}
                                            />
                                        )}

                                        {step === 2 && (
                                            <Step2
                                                businessLicenseType={businessLicenseType}
                                                proprietorDocumentType={proprietorDocumentType}
                                                setBusinessLicenseType={setBusinessLicenseType}
                                                setProprietorDocumentType={setProprietorDocumentType}
                                                proprietorDocumentImageHandler={proprietorDocumentImageHandler}
                                                businessLicenseImageHandler={businessLicenseImageHandler}
                                                handlePrevStep={handlePrevStep}
                                                handleNextStep={handleNextStep}
                                            />
                                        )}

                                        {step === 3 && (
                                            <Step3
                                                bankName={bankName}
                                                accountNumber={accountNumber}
                                                reEnterAccountNumber={reEnterAccountNumber}
                                                accountType={accountType}
                                                ifscCode={ifscCode}
                                                setBankName={setBankName}
                                                setAccountNumber={setAccountNumber}
                                                setReEnterAccountNumber={setReEnterAccountNumber}
                                                setAccountType={setAccountType}
                                                setIfscCode={setIfscCode}
                                                handlePrevStep={handlePrevStep}
                                                handleNextStep={handleNextStep}
                                            />
                                        )}

                                        {step === 4 && (
                                            <Step4
                                                businessCategory={businessCategory}
                                                specialization={specialization}
                                                businessType={businessType}
                                                wholesalerOptions={wholesalerOptions}
                                                manufacturerOptions={manufacturerOptions}
                                                productionCapabilities={productionCapabilities}
                                                addons={addons}
                                                setBusinessCategory={setBusinessCategory}
                                                setSpecialization={setSpecialization}
                                                setBusinessType={setBusinessType}
                                                setOtherBusinessType={setOtherBusinessType}
                                                handleWholesalerOptionChange={handleWholesalerOptionChange}
                                                handleManufacturerOptionChange={handleManufacturerOptionChange}
                                                setProductionCapabilities={setProductionCapabilities}
                                                setAddons={setAddons}
                                                handlePrevStep={handlePrevStep}
                                                handleNextStep={handleNextStep}
                                            />
                                        )}

                                        {step === 5 && (
                                            <Step5
                                                termsValues={termsValues}
                                                setTermsValues={setTermsValues}
                                                handlePrevStep={handlePrevStep}
                                                isFormValid={isFormValid}
                                                SellerContractHandler={SellerContractHandler}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        </PageLayout>
    );
}