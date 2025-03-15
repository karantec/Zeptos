import React from 'react';
import { Link } from 'react-router-dom';
import ShippingPolicy from '../Agreements/ShippingPolicy.pdf'

// import ContactUs from '../pages/contact/ContactUs';
import '../Home_styles/Footer.css'

const Footer = () => {
    return (

        <footer className="bg-dark text-light p-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4>Follow us on</h4>
                        <div className="wrapper">

                            <Link href="#" className="icon facebook">
                                <div className="tooltip">Facebook</div>
                                <span><i className="fab fa-facebook-f"></i></span>
                            </Link>

                            {/* <Link href="#" className="icon twitter">
                <div className="tooltip">Twitter</div>
                <span><i className="fab fa-twitter"></i></span>
              </Link> */}

                            <Link href="#" className="icon instagram">
                                <div className="tooltip">Instagram</div>
                                <span><i className="fab fa-instagram"></i></span>
                            </Link>

                            {/* <Link href="#" className="icon github">
                <div className="tooltip">Github</div>
                <span><i className="fab fa-github"></i></span>
              </Link> */}

                            {/* <Link href="#" className="icon youtube">
                <div className="tooltip">Youtube</div>
                <span><i className="fab fa-youtube"></i></span>
              </Link> */}
                        </div>
                    </div>

                    {/* <div className="col-md-3">
            <h4>Services</h4>
            <p>Example 4</p>
            <p>Example 5</p>
            <p>Example 6</p>
            <p>Example 6</p>
          </div> */}

                    <div className="col-md-3">
                        <Link to='/terms_and_conditions' target="blank" className='footer-text'><h5>Terms and Conditions</h5></Link>
                        <Link to='/privacy_and_policy' target="blank" className='footer-text'><h5>Privacy and Policy</h5></Link>
                        <Link to='/return_and_policy' target="blank" className='footer-text'><h5>Return and Policy</h5></Link>
                        <Link to={ShippingPolicy} target="blank" className='footer-text'><h5>Shipping Policy</h5></Link>
                        
                    </div>

                    <div className="col-md-3">
                        <h4>Pages</h4>
                        <Link to='/contactus' target="blank" className='footer-text'><p>ContactUs</p></Link>
                        <Link to='/aboutus' target="blank" className='footer-text'><p>AboutUs</p></Link>
                        <Link to='/blogs' target="blank" className='footer-text'><p>Blogs</p></Link>
                        <Link to='/pricings' target="blank" className='footer-text'><p>Pricings</p></Link>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-12 text-center">
                        <p>© 2024<b> Sambhav Bejitech Private Limited and Bejiness </b> . All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
