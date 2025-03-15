import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import the Edit icon
import { CgProfile } from "react-icons/cg";
import { TbMoodEmpty } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../SellerConsoleStyles/SellerDashboard.css';
import { GetUser } from '../../../../services/Apis';
import Loader from '../../../../components/Loader';
import SellerDashboardCard from '../../SellerConsoleComponents/SellerDashboardCard';
import SellerPageLayout from '../../SellerConsoleComponents/SellerPageLayout';
import { backend_url } from '../../../../hooks/Auth';


export default function SellerDashboard() {
    const [userData, setUserData] = useState({});
    const [profileImage, setProfileImage] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await GetUser().then((data) => {
                    setUserData(data);
                    setIsLoading(false)
                })
            } catch (error) {
                alert('Error occurred while fetching user data:', error);
                console.error('Error occurred while fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImage(reader.result)
            }
        };

        reader.readAsDataURL(file);

        const token = localStorage.getItem('token')
        setIsLoading(true)
        // update request on fetch
        try {
            const response = await fetch(backend_url + '/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    profile_image: profileImage
                })
            })
            if (!response.ok) {
                toast.error("failed to upload")
            } else {
                await GetUser().then((data) => {
                    setUserData(data);
                })  
                toast.success("successfully updated profile")
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error.content)
        }
    };

    // Default profile picture backend_url or use userData.profile_picture if available
    const defaultProfilePicture = 'home/home-img1.png';

    return (
        <>
            <SellerPageLayout seller={userData.full_name} />
            <ToastContainer />
            {
                isLoading ?
                    <Loader />
                    :
                    <>
                        <div className="row profile-details" style={{ border: '3px dashed #ffb12c' }}>
                            <div className="col-md-4 text-center">
                                {/* Display profile picture */}
                                <div className="profile-picture-container mt-3">

                                    {
                                        userData.profile_image ?
                                            <img
                                                src={userData.profile_image}
                                                alt="Profile"
                                                className="seller-profile-picture mt-1"
                                            />
                                            :
                                            <CgProfile size={102} />
                                    }

                                    <div className="edit-profile-icon">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            id="profilePictureInput"
                                        />
                                        <label htmlFor="profilePictureInput" className='edit-profile-icon'>
                                            <FaEdit />
                                            <span>Edit</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-8">
                                <table className="m-3">
                                    <tbody>
                                        <tr>
                                            <th>Email:</th>
                                            <td>{userData.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number:</th>
                                            <td>{userData.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <th>Company Name:</th>
                                            <td>{userData.company_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Business Category:</th>
                                            <td>{userData.bussiness_type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="col-md-4 text-end">
                                    <p>
                                        <strong>GST Number:</strong> {userData.gst_number}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* 
                        <h2>Manage your products here:</h2>
                        <div className="col-md-12 mt-3 text-center">
                            <Link to="/products" className="btn btn-outline-primary">
                                Manage Products
                            </Link>
                        </div>

                        <h1 className="mb-4">Your Orders</h1>

                        <h3>
                            <TbMoodEmpty size={50} /> No Orders placed yet...<br/>
                            <Link to="/live_market">Start Exploring now :)</Link>
                        </h3> */}

                        <div className="container mt-5">
                            <div className="row">
                                {/* set bootstrap classname as bg */}
                                <div className="col-md-6 col-lg-4">
                                    <SellerDashboardCard
                                        title="Products"
                                        description="Manage your products here."
                                        redirectTo="/seller_console/products"
                                        background="warning"
                                    />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <SellerDashboardCard
                                        title="Orders"
                                        description="Manage your orders here."
                                        redirectTo="/seller_console/orders"
                                        background="primary"
                                    />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <SellerDashboardCard
                                        title="Chat Queries"
                                        description="Manage orders queries here."
                                        redirectTo="/seller_console/chats"
                                        background="primary"
                                    />
                                </div>
                            </div>
                        </div>

                    </>
            }
        </>
    );
}