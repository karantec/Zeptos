import React from 'react';
import '../../../SellerConsoleStyles/Listings.css';

const listings = [
  // { id: 1, product: 'Product A', status: 'Active' },
  // { id: 2, product: 'Product B', status: 'Ready For Activation' },
  // { id: 3, product: 'Product C', status: 'Inactive' },
  // { id: 4, product: 'Product D', status: 'Out of Stock' },
  // { id: 5, product: 'Product E', status: 'Low Stock' },
  // { id: 6, product: 'Product F', status: 'Active' }
];

export default function Listings() {
  const activeCount = listings.filter(listing => listing.status === 'Active').length;
  const readyForActivationCount = listings.filter(listing => listing.status === 'Ready For Activation').length;
  const inactiveCount = listings.filter(listing => listing.status === 'Inactive').length;
  const outOfStockCount = listings.filter(listing => listing.status === 'Out of Stock').length;
  const lowStockCount = listings.filter(listing => listing.status === 'Low Stock').length;

  return (
    <div className="listings-container">
      <h2>Listings</h2>

      <div className="listings-stats">
        <div className="stat">
          <div className="count">{activeCount}</div>
          <div className="title">Active</div>
        </div>
        <div className="stat">
          <div className="count">{readyForActivationCount}</div>
          <div className="title">Ready For Activation</div>
        </div>
        <div className="stat">
          <div className="count">{inactiveCount}</div>
          <div className="title">Inactive</div>
        </div>
        <div className="stat">
          <div className="count">{outOfStockCount}</div>
          <div className="title">Out of Stock</div>
        </div>
        <div className="stat">
          <div className="count">{lowStockCount}</div>
          <div className="title">Low Stock</div>
        </div>
      </div>
    </div>
  );
}
