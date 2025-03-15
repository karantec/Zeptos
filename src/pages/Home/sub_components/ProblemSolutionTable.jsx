import React from 'react';
import '../Home_styles/ProblemSolutionTable.css'; // Import the CSS file

const ProblemSolutionTable = () => {
  const data = [
    {
      problem: "Inconsistent Pricing",
      description: "Fluctuating supplier prices make it hard to predict costs and set stable prices.",
      solution: "Unified marketplace with transparent pricing ensures consistent and fair pricing for businesses."
    },
    {
      problem: "Unreliable Suppliers",
      description: "Suppliers provide inconsistent quality and delayed deliveries, disrupting business operations.",
      solution: "Network of verified suppliers ensures high-quality and reliable products with timely deliveries."
    },
    {
      problem: "Language Barriers",
      description: "Communication issues due to language differences hinder effective business transactions.",
      solution: "Multilingual support overcomes language barriers, enabling smooth communication and transactions."
    },
    {
      problem: "Limited Market Reach",
      description: "MSMEs are confined to local markets and struggle to expand to other regions or internationally.",
      solution: "Platform connects businesses across India and globally, expanding their market reach and opportunities for growth."
    },
    {
      problem: "Lack of Digital Tools",
      description: "MSMEs lack access to advanced digital tools for efficient operations.",
      solution: "Comprehensive digital tools for inventory management, billing, and customer relationship management (CRM) streamline operations."
    },
    {
      problem: "Fragmented Market Structure",
      description: "The B2B market is highly fragmented, making it difficult to find and connect with reliable partners.",
      solution: "Unified platform consolidates the market, making it easy to find and connect with reliable partners."
    },
    {
      problem: "Payment Delays",
      description: "Credit-based transactions lead to payment delays, affecting cash flow and financial stability.",
      solution: "Secure payment solutions support both cash and digital payments, ensuring timely payments and improving cash flow."
    },
    {
      problem: "Lack of Market Insights",
      description: "MSMEs lack access to real-time market data and insights for informed decision-making.",
      solution: "AI-driven insights provide real-time market data and analytics, helping businesses make informed decisions."
    },
    {
      problem: "Supply Chain Inefficiencies",
      description: "Inefficiencies in the supply chain result in increased costs and delays.",
      solution: "Efficient supply chain management tools reduce costs and improve delivery times."
    },
    {
      problem: "Difficulty in Building Trust",
      description: "Establishing trust with new business partners is challenging in a competitive, fragmented market.",
      solution: "Verified supplier network and transparent ratings build trust and facilitate new business relationships."
    }
  ];

  return (
    <div className="why-choose-container">
      <h1 className="why-choose-title">The Challenges MSMEs Face and How Bejiness.com Solves Them</h1>
      <div className="why-choose-table-wrapper">
        <table className="why-choose-table why-choose-table-bordered">
          <thead className="why-choose-thead">
            <tr>
              <th>Problem</th>
              <th>Description</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'why-choose-table-striped' : ''}>
                <td data-label="Problem">{item.problem}</td>
                <td data-label="Description">{item.description}</td>
                <td data-label="Solution">{item.solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemSolutionTable;
