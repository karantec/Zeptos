import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { IoNotificationsSharp } from 'react-icons/io5';
import { AiFillProduct } from "react-icons/ai";
import { TbMenuOrder } from "react-icons/tb";
import { BsFillChatSquareDotsFill } from "react-icons/bs";

import { GetUser } from '../../../services/Apis';
import '../../../styles/PageLayout.css';
import GoToTop from '../../../components/GoToTop';


export const RefreshUser = async () => {
    const data = await GetUser();
    localStorage.setItem('userData', JSON.stringify(data));
};

const SellerPageLayout = ({ children }) => {
    // const [userData, setUserData] = useState({});
    // const [query, setQuery] = useState('');
    // const navigate = useNavigate();

    const [userData, setUserData] = useState({});


    useEffect(() => {

        if (localStorage.getItem('userData')) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }

        const fetchData = async () => {
            const data = await GetUser();
            setUserData(data);
            localStorage.setItem('userData', JSON.stringify(data));
        };

        if (Object.keys(userData).length == 0)
            fetchData();
    }, []);

    //   const handleSearch = () => {
    //     if (query.trim()) {
    //       navigate(`/live_market/search?q=${encodeURIComponent(query)}`);
    //     }
    //   };


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top nav-bg-blue">
                <div className="container-fluid">
                    <Link to="/seller_console" className="navbar-brand d-flex">
                        <img
                            src="/home/bejiness-logo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-text-top"
                            alt="Logo"
                        />
                        <h4 className='text-warning'>Welcome {userData.full_name}!</h4>
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* <form className="d-flex mx-auto my-2 my-lg-0 search-bar-container" onSubmit={handleSearch}>
              <input
                className="form-control me-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button className="btn btn-outline-warning m-0" type="submit">
                <BiSearchAlt size={25} />
              </button>
            </form> */}

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item nav-res-item">
                                <Link to="/seller_console/products" className="nav-link nav-cart">
                                    <AiFillProduct color="white" size={25} /> Products
                                </Link>
                            </li>

                            <li className="nav-item nav-res-item">
                                <Link
                                    to="/seller_console/orders"
                                    className="nav-link nav-cart"
                                >
                                    <TbMenuOrder color="white" size={25} /> Orders
                                </Link>
                            </li>

                            <li className="nav-item nav-res-item">
                                <Link
                                    to="/seller_console/chats"
                                    className="nav-link nav-cart"
                                >
                                    <BsFillChatSquareDotsFill className='mx-1' color="white" size={20} /> Chat Queries
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

            <div className="container container-pagelayout">
                {children}
                <GoToTop />
            </div>
        </>
    );
}

export default SellerPageLayout;
