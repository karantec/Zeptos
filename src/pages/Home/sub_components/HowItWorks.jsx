import React from 'react';
import '../Home_styles/HowItWorks.css'; // Import the updated CSS file

const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <div className="how-it-works-header">
        <h1 className="how-it-works-heading">How Bejiness.com Works?</h1>
      </div>
      <div className="how-it-works-steps">
        <div className="how-it-works-step">
          <h2 className="how-it-works-step-title">Step 1: "Sign Up"</h2>
          <p className="how-it-works-step-description">Create Your Account in Minutes</p>
        </div>
        <div className="how-it-works-step">
          <h2 className="how-it-works-step-title">Step 2: "Connect"</h2>
          <p className="how-it-works-step-description">Find Reliable Partners and Start Trading</p>
        </div>
        <div className="how-it-works-step">
          <h2 className="how-it-works-step-title">Step 3: "Grow"</h2>
          <p className="how-it-works-step-description">Utilize our Tools to Expand Your Business</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
