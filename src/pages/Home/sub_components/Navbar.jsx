import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Home_styles/Navbar.css';

const Navbar = (props) => {
    const [scrolled, setScrolled] = useState(props.isScrolled ? false : true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Add loaded class after component mounts for animations
        setIsLoaded(true);
        
        // Handle scroll events
        if (props.isScrolled != null) {
            const handleScroll = () => {
                const scrollPosition = window.scrollY;
                setScrolled(scrollPosition > 100); // Reduced threshold for earlier effect
            };
            
            window.addEventListener('scroll', handleScroll);
            
            // Initial check
            handleScroll();
            
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [props.isScrolled]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className={`navbar navbar-expand-lg navbar-dark ${scrolled ? 'bg-dark nav-scrolled' : 'bg-transparent1'} fixed-top ${isLoaded ? 'loaded' : ''}`}
        >
            <div className="container" style={{ maxWidth: '1200px' }}>
                <Link
                    className="navbar-brand font-weight-bold"
                    to="/"
                    aria-label="Go to homepage"
                >
                    <img
                        src="/home/bejiness-logo.png"
                        width="50"
                        height="45"
                        className="d-inline-block align-top"
                        alt="Bejiness Logo"
                    />
                    {/* Uncomment if you want text beside the logo */}
                    {/* <span className="logo-text d-none d-md-inline">Bejiness</span> */}
                </Link>
                
                <button
                    className={`navbar-toggler ${isMobileMenuOpen ? 'open' : ''}`}
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                    onClick={toggleMobileMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div 
                    className={`collapse navbar-collapse justify-content-end ${isMobileMenuOpen ? 'show' : ''}`} 
                    id="navbarNav"
                >
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${scrolled ? '' : 'mob-noscroll'} ${location.pathname === '/blogs' ? 'special' : ''}`}
                                to="/blogs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link login-btn ${scrolled ? '' : 'mob-noscroll'}`}
                                to="/login"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link signup-btn ${scrolled ? '' : 'mob-noscroll'}`}
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;