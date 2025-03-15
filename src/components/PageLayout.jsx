import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { IoNotificationsSharp } from 'react-icons/io5';
import { FaCartPlus } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { SiChatbot } from "react-icons/si";

import { GetUser } from '../services/Apis';
import { useAuth } from '../features/Auth/AuthContext';
import '../styles/PageLayout.css';
import GoToTop from './GoToTop';

export const RefreshUser = async () => {
  const data = await GetUser();
  localStorage.setItem('userData', JSON.stringify(data));
};

const PageLayout = ({ children }) => {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }

    const fetchData = async () => {
      const data = await GetUser();

      if (data.status === "invalid-token") {
        localStorage.setItem('token', '');
        localStorage.setItem('userData', '');
        setToken(localStorage.getItem('token'));
        navigate("/login");
      }

      setUserData(data);
      localStorage.setItem('userData', JSON.stringify(data));
    };

    if (Object.keys(userData).length === 0) fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/live_market/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('userData', '');
    setToken(localStorage.getItem('token'));
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top nav-bg-blue">
        <div className="container-fluid">
          <Link to="/live_market" className="navbar-brand">
            <img
              src="/home/bejiness-logo.png"
              width="40"
              height="40"
              className="d-inline-block align-text-top"
              alt="Logo"
            />
          </Link>

          {/* Search Bar in Header */}
          <form className="d-flex mx-auto search-bar-container" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Search for products, categories and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" type="submit">
              <BiSearchAlt size={22} />
            </button>
          </form>

         

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {userData.account_type === "seller" ? (
                <li className="nav-item nav-res-item">
                  <Link to="/seller_console" className="nav-link">
                    <RiMoneyRupeeCircleFill size={22} />
                    <span>Seller Console</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-item nav-res-item">
                  <Link to="/seller_contract" className="nav-link">
                    <BsGraphUpArrow size={22} />
                    <span>Become a Seller</span>
                  </Link>
                </li>
              )}

              <li className="nav-item nav-res-item">
                <Link to="/chats" className="nav-link">
                  <SiChatbot size={22} />
                  <span>Chats</span>
                </Link>
              </li>

              <li className="nav-item nav-res-item">
                <Link to="/view_cart" className="nav-link">
                  <FaCartPlus size={22} />
                  <span>Cart</span>
                </Link>
              </li>

              <li className="nav-item nav-res-item">
                <Link to="/profile" className="nav-link">
                  <CgProfile size={22} />
                  <span>Profile</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/home" onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container container-pagelayout">{children}</div>

      {/* Mobile Footer Navigation */}
      <footer className="mobile-footer">
        <Link to="/seller_contract" className="footer-item">
        <BsGraphUpArrow size={22} />
          <span>Become A seller</span>
        </Link>
        <Link to="/view_cart" className="footer-item">
        <FaCartPlus size={22} />
          <span>Cart</span>
        </Link>
        <Link to="/chats" className="footer-item">
        <SiChatbot size={22} />
        <span>Chats</span>
        </Link>
        <Link to="/profile" className="footer-item">
          <FaCartPlus size={22} />
          <span>Profile</span>
        </Link>
      </footer>
    </>
  );
};

export default PageLayout;
