import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../SellerConsoleStyles/SellerDashboardCard.css'; // Custom styles if needed

const SellerDashboardCard = ({ title, description, redirectTo, background }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectTo);
  };

  return (
    <div className={`card mb-4 shadow-sm border-2 border-${background} seller-dashboard-card btn-outline-${background}`} onClick={handleClick} role="button">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

SellerDashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default SellerDashboardCard;
