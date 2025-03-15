
import React, { useState } from 'react';
import '../../../SellerConsoleStyles/AllOrdersTable.css';

const orders = [
  { id: 1, product: 'Product A', quantity: 10, date: '2024-07-15', status: 'New', totalPayment: 100 },
  { id: 2, product: 'Product B', quantity: 5, date: '2024-07-14', status: 'Shipped', totalPayment: 50 },
  { id: 3, product: 'Product C', quantity: 20, date: '2024-07-13', status: 'New', totalPayment: 200 },
  { id: 4, product: 'Product D', quantity: 8, date: '2024-07-12', status: 'Cancelled', totalPayment: 80 },
  { id: 5, product: 'Product E', quantity: 15, date: '2024-07-11', status: 'Urgent', totalPayment: 150 },
  { id: 6, product: 'Product F', quantity: 12, date: '2024-07-10', status: 'Shipped', totalPayment: 120 },
  { id: 7, product: 'Product G', quantity: 18, date: '2024-07-09', status: 'New', totalPayment: 180 }
];

export default function AllOrdersTable() {
  const [filter, setFilter] = useState('All');

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="orders-table-container">
      <h2>All Orders</h2>
      <nav className="order-nav">
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('New')} className={filter === 'New' ? 'active' : ''}>New Orders</button>
        <button onClick={() => setFilter('Shipped')} className={filter === 'Shipped' ? 'active' : ''}>Shipped</button>
        <button onClick={() => setFilter('Cancelled')} className={filter === 'Cancelled' ? 'active' : ''}>Cancelled Orders</button>
      </nav>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>${order.totalPayment}</td>
              <td><button className="view-detail-button">View Detail</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
