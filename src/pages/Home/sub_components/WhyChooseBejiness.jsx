import React from 'react';
import '../Home_styles/WhyChooseBejiness.css'; // Import the CSS file for additional styling if needed

export default function WhyChooseBejiness() {
    return (
        <div className="why-choose-container my-5">
            <div style={{width:'100%'}}>
            <h2 className="why-choose-title text-center mb-4">Why Choose Bejiness.com?</h2>
            </div>
            <table className="why-choose-table1 table table-bordered table-striped">
                <thead className="why-choose-thead">
                    <tr>
                        <th>Feature</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Unified Marketplace</td>
                        <td>Simplifies sourcing and selling</td>
                    </tr>
                    <tr>
                        <td>Multilingual Support</td>
                        <td>Breaks down language barriers</td>
                    </tr>
                    <tr>
                        <td>AI-Driven Insights</td>
                        <td>Empowers data-driven decisions</td>
                    </tr>
                    <tr>
                        <td>Secure Transactions</td>
                        <td>Ensures timely payment</td>
                    </tr>
                    <tr>
                        <td>Verified Suppliers</td>
                        <td>Ensures high-quality partnerships</td>
                    </tr>
                    <tr>
                        <td>Comprehensive Tools</td>
                        <td>Enhance productivity and efficiency</td>
                    </tr>
                    <tr>
                        <td>Expanded Market Reach</td>
                        <td>Opens up new growth opportunities</td>
                    </tr>
                    <tr>
                        <td>Special Offers</td>
                        <td>Provides cost-saving deals</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
