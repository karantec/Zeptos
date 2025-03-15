import React, { useState, useEffect } from 'react';
import { backend_url } from '../../../../hooks/Auth';

export default function Address({ onSubmit }) {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [address, setAddress] = useState({
    state: '',
    city: '',
    postalCode: '',
    shipAddress: ''
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isProceedClickable, setIsProceedClickable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch addresses from the API when the component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(backend_url + '/api/address/getaddress', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token // Send token in header
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch addresses.');
        }

        const data = await response.json();
        setSavedAddresses(data.data); // Fix: Access the 'data' field in the response object
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // Enable button only when all fields are filled
  useEffect(() => {
    const allFieldsFilled =
      address.state.trim() !== '' &&
      address.city.trim() !== '' &&
      address.postalCode.trim() !== '' &&
      address.shipAddress.trim() !== '';

    setIsProceedClickable(allFieldsFilled);
  }, [address]);

  // Handle selecting a saved address
  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    setAddress(savedAddresses[index]); // Set form values to the selected saved address
    setIsAddingNewAddress(false); // Ensure you're not in the "Add New Address" mode
  };

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    setSelectedAddressIndex(null); // Reset saved address selection if user starts editing form
  };

  // Handle saving the address via API
  const handleSaveAddress = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await fetch(backend_url + '/api/address/saveaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token // Send token in header
        },
        body: JSON.stringify(address),
      });

      if (!response.ok) {
        throw new Error('Failed to save the address.');
      }

      const savedAddress = await response.json();
      console.log('Address saved successfully:', savedAddress);

      // Update saved addresses state with the new address
      setSavedAddresses([...savedAddresses, savedAddress.data]);

      // Pass the saved address back to the parent component
      onSubmit(savedAddress);
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAddressIndex !== null) {
      onSubmit(savedAddresses[selectedAddressIndex]);
    } else {
      handleSaveAddress();
    }
  };

  return (
    <>
      {/* Display saved addresses */}
      {savedAddresses.length > 0 && !isAddingNewAddress && (
        <div className="saved-addresses">
          <h5>Select a saved address:</h5>
          <ul className="list-group mb-3">
            {savedAddresses.map((addr, index) => (
              <li
                key={index}
                className={`list-group-item ${selectedAddressIndex === index ? 'active' : ''}`}
                onClick={() => handleSelectAddress(index)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <strong>{addr.shipAddress}</strong>, {addr.city}, {addr.state}, {addr.postalCode}
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary" onClick={() => setIsAddingNewAddress(true)}>
            Add New Address
          </button>
        </div>
      )}

      {/* Display new address form */}
      {(isAddingNewAddress || savedAddresses.length === 0) && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={address.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={address.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              className="form-control"
              value={address.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <input
              type="text"
              name="shipAddress"
              className="form-control"
              value={address.shipAddress}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading || !isProceedClickable}>
            {loading ? 'Saving...' : 'Save and Proceed'}
          </button>
        </form>
      )}

      {/* Proceed button for saved address */}
      {selectedAddressIndex !== null && !isAddingNewAddress && (
        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          Proceed
        </button>
      )}
    </>
  );
}
