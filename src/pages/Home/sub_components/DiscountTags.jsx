import React from 'react';
import '../Home_styles/DiscountTags.css'; // Import the updated CSS file
import { Link } from 'react-router-dom';

const DiscountTags = () => {
  return (
    <div className="discount-tags-container">
      {/* <h1 className="discount-tags-heading">Special Offers and Promotions</h1> */}
      <h2 className="discount-tags-title">Special Offers Just for You</h2>
      <p className="discount-tags-description">Limited Time Deals, Best-Selling Products, New Arrivals</p>
      <Link to={"/signup"}>
        <button className="discount-tags-button-unique">Steal The Deal</button>
      </Link>
    </div>
  );
};

export default DiscountTags;
