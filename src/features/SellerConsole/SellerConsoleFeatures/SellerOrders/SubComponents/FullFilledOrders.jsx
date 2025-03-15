import React from 'react';
import '../../../SellerConsoleStyles/FullFilledOrders.css';

const orders = [];

export default function FullFilledOrders() {
  const newOrdersCount = orders.filter(order => order.status === 'New').length;
  const urgentOrdersCount = orders.filter(order => order.status === 'Urgent').length;
  const totalPaymentsCount = orders.length;
  const totalPayments = orders.reduce((sum, order) => sum + order.totalPayment, 0);

  return (
    <div className="orders-container">
      <h2>FullFilled Orders</h2>
      
      <table className="order-stats-table">
        <thead>
          <tr>
            <th>New Orders</th>
            <th>Urgent Orders</th>
            <th>Payments Count</th>
            <th>Total Payments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{newOrdersCount}</td>
            <td>{urgentOrdersCount}</td>
            <td>{totalPaymentsCount}</td>
            <td>₹{totalPayments}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
