import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Cart.css';
import PageLayout from '../../components/PageLayout';
import { DeleteItem, GetItems, UpdateQuantity } from '../../services/Apis';
import Loader from '../../components/Loader';
import { useAuth } from '../Auth/AuthContext';
import Address from './component/Address/Address';
import { Modal } from 'react-bootstrap';
import { backend_url } from '../../hooks/Auth';

function ViewCart() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false); // State for modal visibility
  const [shippingAddress, setShippingAddress] = useState(null); // State to store the address data

  const fetchCartItems = async () => {
    setIsLoading(true);
    await GetItems().then((cartData) => {
      setCartItems(cartData.cart_items.product_details);
      setTotalAmount(cartData.cart_items.total_amount);
      setIsLoading(false);
    }).catch(error => {
      if (error.status === "invalid-token") {
        localStorage.setItem('token', '');
        localStorage.setItem('userData', '');
        setToken(localStorage.getItem('token'));
        navigate("/login");
      }
      toast.error(error.content);
    });
  };

  useEffect(() => {
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setQuantity(totalQuantity);
  }, [cartItems]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleSaveClick = async (productId, quantity) => {
    await UpdateQuantity(productId, quantity).then((data) => {
      if (!data.success) {
        toast.error(data.content);
      } else {
        toast.success(data.content);
        fetchCartItems();
      }
    }).catch(error => {
      if (error.status === "invalid-token") {
        localStorage.setItem('token', '');
        localStorage.setItem('userData', '');
        setToken(localStorage.getItem('token'));
        navigate("/login");
      }
      toast.error(error.content);
    });
  };

  const deleteItemHandler = async (productId) => {
    try {
      const data = await DeleteItem(productId);
      fetchCartItems();
      toast.success(data.content);
    } catch (error) {
      toast.error(error.content);
    }
  };

  useEffect(() => {
    if(shippingAddress != null){
      console.log(cartItems);
      
      // initiateRazorpayPayment(); 
      placeOrder("1234")
    }  
  
  }, [shippingAddress])
  
  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setShowAddressModal(false);
  };

  const initiateRazorpayPayment = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'))

    const options = {
      key: "rzp_test_2NeEZJpOj1mDAk",
      amount: totalAmount * 100,
      currency: "INR",
      name: userData["full_name"],
      description: "Test Transaction",
      handler: async function (response) {
        await placeOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: userData["full_name"],
        email: userData["email"],
        contact: userData["phone_number"]
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const placeOrder = async (paymentId) => {
    const token = localStorage.getItem('token');

    const orderData = {
      ordered_items: cartItems,
      total_cost: totalAmount,
      state: shippingAddress.state,
      city: shippingAddress.city,
      postal_code: shippingAddress.postalCode,
      ship_address: shippingAddress.shipAddress,
      payment_id: paymentId
    };

    try {
      const response = await fetch(backend_url + "/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'token': token
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Order placed successfully!");
        // navigate("/order-success", { state: { orderId: result.order_id } });
      } else {
        toast.error(result.content);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <PageLayout />
      <ToastContainer />
      <div className="container mt-4 viewcart-main">
        <div className="row cart-item-mrg">
          <div className="col-12">
            <h2>Cart Items</h2>
          </div>
        </div>
        <div className="row cart-item-mrg">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="col-md-8">
              {cartItems.length !== 0 ? (
                <>
                  {cartItems.map((item, index) => (
                    <div className="row product-list border mb-1 cart-item-row" key={index}>
                      <div className="col-md-8 product-details">
                        <div className="d-flex align-items-center">
                          <img src={item.product_image[0]} alt="" className="cart-img border shadow-lg" />
                          <div className="ml-3">
                            <div className="order-id">Product ID: {item.product_id}</div>
                            <h4>{item.product_name}</h4>
                            <p>Seller: {item.seller}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 action-buttons">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control quantity-input"
                            defaultValue={item.quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-2 button-container">
                        <button
                          className="btn btn-success ml-md-2"
                          onClick={() => handleSaveClick(item.product_id, quantity)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteItemHandler(item.product_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h3>No items found in the cart</h3>
              )}
            </div>
          )}
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Price Summary</div>
              <div className="card-body">
                <h4>Total Items: {quantity}</h4>
                <h4>Total Amount: ₹{totalAmount}</h4>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => setShowAddressModal(true)}
                  disabled={cartItems.length === 0}
                >
                  {
                    cartItems.length === 0 ?
                      "Cart Empty"
                      :

                      "Proceed"
                  }
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Address onSubmit={handleAddressSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewCart;
