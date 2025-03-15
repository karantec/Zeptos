import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import '../styles/Card.css';

export default function Card(props) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(-1);
  
  return (
    <div className="product-cards-container">
      <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3 justify-content-center">
        {props.products.map((product, index) => (
          <div className="col" key={index}>
            <div
              className={`product-card ${hovered === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(-1)}
              onClick={() => navigate("/product_details/" + product.product_id)}
            >
              <div className="product-img-wrapper">
                <img
                  className="product-img"
                  src={product.images}
                  alt={product.product_name}
                />
              </div>
              
              <div className="product-details">
                <h5 className="product-title">{product.product_name}</h5>
                <p className="product-price">
                  <strong>₹{product.prices[product.prices.length - 1].price}</strong>
                </p>
              </div>
              
              <div className="seller-info">
                <div className="seller-profile">
                  <CgProfile className="profile-icon" />
                </div>
                <div className="seller-details">
                  <p className="seller-name">{product.seller.seller_company}</p>
                  <div className="verification-badge">
                    <img
                      src="/home/bejiness-verified.png"
                      alt="Bejiness Verified"
                      className="verification-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}