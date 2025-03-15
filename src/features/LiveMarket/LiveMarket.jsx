import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import './LiveMarket.css';
import { AiOutlineClockCircle } from 'react-icons/ai';

export default function LiveMarket({ products }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(-1);
  const [timeLeft, setTimeLeft] = useState([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      return products.map((product) => {
        const expireInDate = new Date(product.expireIn);
        const currentDateUTC = new Date();

        const timeDifferenceInMilliseconds = expireInDate.getTime() - currentDateUTC.getTime();
        const hoursLeft = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        return `${hoursLeft}h ${minutesLeft}min`;
      });
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup on unmount
  }, [products]);

  return (
    <div className="live-market-container-custom">
      <div className="live-market-tag-custom">Live Market</div>

      <div className="row live-market-cards-container-custom d-flex mt-5">
        <div className="d-flex flex-nowrap overflow-auto">
          {products
            .filter(product => {
              const expireInDate = new Date(product.expireIn);
              const currentDateUTC = new Date();
              return expireInDate > currentDateUTC;
            })
            .map((product, index) => (
              <div
                onClick={() => navigate("/product_details/" + product.product_id)}
                style={{ cursor: "pointer" }}
                className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 d-flex live-market-dash-prod-card-custom"
                key={index}
              >
                <div
                  className={`card ${hovered === index ? 'shadow-lg' : 'shadow'} flex-grow-1`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(-1)}
                >
                  <div className="image-container live-market-image-container">
                    <img
                      className="card-img-top"
                      height={100}
                      width={100}
                      src={product.images}
                      alt={product.product_name}
                    />
                    <span className="live-tag live-market-live-tag">Live</span>
                  </div>
                  <div className="card-body d-flex flex-column live-market-card-body-custom">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text live-market-card-text">{product.description}</p>
                    <div className="live-market-time-left-container">
                      <AiOutlineClockCircle className="live-market-clock-icon" />
                      <span className="live-market-time-left-text">Left: {timeLeft[index]}</span>
                    </div>
                    <p className="card-text live-market-card-text">
                      <b>{product.prices[product.prices.length - 1].price}rs</b>
                    </p>
                  </div>

                  <div className="d-flex live-market-border-top-custom">
                    {product.seller.profile_image ? (
                      <img
                        src={product.seller.profile_image}
                        style={{ border: 'none', borderRadius: '50%' }}
                        alt="Profile"
                        height={35}
                        width={35}
                        className="m-2"
                      />
                    ) : (
                      <CgProfile size={25} className="m-2" />
                    )}
                    <p className="d-inline m-2">{product.seller.seller_company}</p>
                    {product.seller.is_seller_verified && (
                      <p className="d-inline m-2">
                        <img
                          src="/home/bejiness-verified.png"
                          width="25"
                          height="25"
                          alt="Bejiness Verified"
                        />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* See More Card */}
          <div
            className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 d-flex live-market-dash-prod-card-custom"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate("/all_products")}
          >
            <div className="card shadow flex-grow-1 d-flex align-items-center justify-content-center">
              <h5>See More</h5>
              <span className="live-market-arrow-icon-custom">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
