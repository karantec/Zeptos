import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbMoodEmpty } from 'react-icons/tb';

import '../../styles/BuyerProfile.css'
import PageLayout from '../../components/PageLayout'
import { GetBuyerOrders, GetUser } from '../../services/Apis';
import Loader from '../../components/Loader';
import { useAuth } from '../Auth/AuthContext';

function BuyerProfile() {

    const navigate = useNavigate()
    const { setToken } = useAuth()

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
        try {

            const fetchUserData = async () => {
                const data = await GetUser();
                if (data.status == "invalid-token") {
                    localStorage.setItem('token', '');
                    localStorage.setItem('userData', '')
                    setToken(localStorage.getItem('token'));
                    navigate("/login")
                }
                setUserData(data);
                localStorage.setItem('userData', JSON.stringify(data));
            }
            if (Object.keys(userData).length == 0)
                fetchUserData();

        } catch (error) {
            toast.error(error.content)
        }


        const fetchOrderData = async () => {
            setIsLoading(true)
            await GetBuyerOrders().then((res) => {
                console.log(res);

                setOrdersList(res.Orders)
                setIsLoading(false)
            }).catch((error) => {
                if (error.status == "invalid-token") {
                    localStorage.setItem('token', '');
                    localStorage.setItem('userData', '')
                    setToken(localStorage.getItem('token'));
                    navigate("/login")
                }
                setIsLoading(false)
                toast.error("error while fetching orders: ", error.content);
            })
        }
        fetchOrderData();

    }, []);

    return (
        <PageLayout>
            <ToastContainer />
            {
                isLoading ?
                    <Loader />
                    :
                    <>

                        <div className="container mt-5">
                            <div className="card shadow-lg">
                                <div className="card-header bg-primary text-white d-flex align-items-center">
                                    {/* <img
                                        src="https://via.placeholder.com/50"
                                        alt="Avatar"
                                        className="rounded-circle me-3"
                                    /> */}
                                    <h3 className="mb-0">Welcome {userData.full_name}!</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Full Name:</label>
                                        <div className="col-sm-10">
                                            <p className="form-control-plaintext">{userData.full_name}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Email:</label>
                                        <div className="col-sm-10">
                                            <p className="form-control-plaintext">{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Phone Number:</label>
                                        <div className="col-sm-10">
                                            <p className="form-control-plaintext">{userData.phone_number}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">Address:</label>
                                        <div className="col-sm-10">
                                            <p className="form-control-plaintext">{userData.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />

                        <h1 className="mb-4">Orders List</h1>

                        <div className="order-container row">
                            {
                                ordersList.length != 0 ?
                                    <>
                                        {
                                            ordersList.map((order, index) => (
                                                <div className="card cart-item-row m-5  border border-success" key={index}>
                                                    <div className="card-header orderlist-head">
                                                        Order #{order.order_id}
                                                    </div>
                                                    <div className="card-body order-card-body2">
                                                        {
                                                            order.ordered_items.map((product, sub_index) => (
                                                                <React.Fragment key={sub_index}>
                                                                    <div className="row product-list border mb-1 cart-item-row" key={index}>
                                                                        <div className="col-md-8 product-details">
                                                                            <div className="d-flex align-items-center">
                                                                                <img src={product.product_image[0]} alt="" className="cart-img border shadow-lg" />
                                                                                <div className="ml-3">
                                                                                    <div className="order-id">Product #{product.product_id}</div>
                                                                                    <h4>{product.product_name}</h4>
                                                                                    <p>Quantity: {product.quantity} {product.unit}</p>
                                                                                    <p>Seller: {product.seller}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {index < order.ordered_items.length - 1 && <hr />}
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                    </div>
                                                    {/* <div className="card-footer d-flex justify-content-between align-items-center">
                                                        <Link to="/order_details" className="btn btn-primary">
                                                            Check Details
                                                        </Link>
                                                    </div> */}
                                                </div>
                                            ))
                                        }
                                    </>
                                    :
                                    <h3>
                                        <TbMoodEmpty size={50} /> No Orders placed yet...<br />
                                        <Link to="/live_market">Start Exploring now :)</Link>
                                    </h3>
                            }
                        </div>
                    </>

            }

        </PageLayout>
    );
}

export default BuyerProfile;