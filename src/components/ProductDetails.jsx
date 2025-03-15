import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/ProductDetails.css";
import PageLayout from "./PageLayout";
import { AddItem, GetProduct } from "../services/Apis";
import Loader from "./Loader";
import { useAuth } from "../features/Auth/AuthContext";
import { backend_url } from "../hooks/Auth";
import Navbar from '../pages/Home/sub_components/Navbar'

function ProductDetails() {
  const id = useParams();
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const [hasToken, setHasToken] = useState(null)

  const [product, setProduct] = useState({});
  const [prices, setPrices] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setHasToken(localStorage.getItem('token'));
  }, []);

  const startChat = async (seller_id) => {
    console.log("seller id is: ", seller_id);

    setIsLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(backend_url + '/api/chat/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          seller_id: seller_id
        }),
      });

      setIsLoading(false)
      const data = await response.json()
      navigate(`/chats/${data.room_id}`); // Navigate to the chat page with the roomId
    } catch (err) {
      setIsLoading(false)
      console.error('Error starting chat:', err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        await GetProduct(id.productId).then((data) => {
          // if (data.status == "invalid-token") {
          //   localStorage.setItem('token', '');
          //   localStorage.setItem('userData', '')
          //   setToken(localStorage.getItem('token'));
          //   navigate("/login")
          // }
          if (data.success == "false") {
            toast.error("product not found")
          }
          setProduct(data);
          setPrices(data.prices);
          setSpecs(data.specs);
          setImages(data.images[0]);
          setIsLoading(false)
          console.log(data);

        })
        setIsLoading(false)
      } catch (error) {
        toast.error(error.content);
        setIsLoading(false)
      }
    };
    fetchProduct();
  }, []);

  const addItemHandler = () => {
    const addItem = async () => {
      try {
        setIsLoading(true)
        await AddItem(id.productId).then(() => {
          setIsLoading(false)
          toast.success("Added to the cart")
        });
      } catch (error) {
        if (error.status == "invalid-token") {
          localStorage.setItem('token', '');
          localStorage.setItem('userData', '')
          setToken(localStorage.getItem('token'));
          navigate("/login")
        }
        toast.error(error.content);
      }
    };
    addItem();
  };


  const cardStyle = {
    border: "1px solid #e0e0e0", // Light border color
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle box shadow
    borderRadius: "8px", // Rounded corners
    padding: "20px", // Adjust padding as needed
    marginBottom: "20px", // Adjust margin as needed
  };

  return (

    <>
      {
        hasToken ?
          <PageLayout />
          :
          <Navbar />
      }


      <ToastContainer />

      {
        isLoading ?
          <Loader />
          :
          <div className="product-details-card-container" style={cardStyle}>
            <div className="product-details-card">
              <div className="row">
                <div className="col-md-5">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>

                    <div className="carousel-inner carousel-inner-centr">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? "active" : ""
                            }`}
                        >
                          <img
                            src={image}
                            className="carousel-image"
                            alt={`Product Image ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      className="carousel-control-prev carousel-btn bg-dark"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next carousel-btn bg-dark"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>


                </div>

                <div className="col-md-6">
                  <h2 className="mt-2">
                    <b>{product.product_name}</b>
                  </h2>
                  <h2 className="lead">{product.description}</h2>

                  <br />
                  <hr />
                  <br />

                  <p>Manufacturer</p>
                  <Link to={`/seller/${product.seller_id}`} className="text-decoration-none">
                    <div className="d-flex align-items-center p-3 border rounded bg-light shadow-sm">
                      {/* <img
                        src=""
                        alt="Seller Profile"
                        className="rounded-circle me-3"
                        style={{ width: '50px', height: '50px' }}
                      /> */}
                      <div className="d-flex">
                        {
                          product.profile_image ?
                            <img
                              src={product.profile_image}
                              style={{ border: 'none', borderRadius: '50%' }}
                              alt="Profile"
                              height={35}
                              width={35}
                            />
                            :
                            <CgProfile size={25} />
                        }
                        <h5 className="m-0 mx-3 text-dark">{product.seller_company}</h5>
                        <p className="d-inline m-0">
                          <img
                            src="/home/bejiness-verified.png"
                            width="25"
                            height="25"
                            alt="Bejiness Verified"
                          />
                        </p>
                      </div>
                    </div>
                  </Link>
                  <br />
                  <hr />
                  <br />

                  <h5>Pricings</h5>
                  <table className="table table-divider">
                    <thead>
                      <tr>
                        <th>Quantity Range</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody >
                      {prices.map((price, index) => (
                        <tr key={index}>
                          <td>
                            {price.quantityRange.min ?
                              price.quantityRange.min : 0
                            } {product.unit} -
                            {price.quantityRange.max ?
                              price.quantityRange.max : "more"
                            } {product.unit}
                          </td>
                          <td>₹{price.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <br />
                  <h5>Specifications</h5>
                  <br />

                  <table className="table table-bordered border-dark">
                    {/* <thead>
                      <tr>
                        <th>Detailed Specs</th>
                        <th></th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {specs.map((spec, index) => {
                        return (
                          <tr key={index}>
                            <td>{spec.key}</td>
                            <td>{spec.value}</td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="card d-flex prod-details-butadd m-5">

                    {
                      hasToken ?
                        <>
                          <button
                            onClick={addItemHandler}
                            className="btn addcart-prodetail btn-outline-primary"
                          >Add to Cart</button>

                          <button
                            onClick={() => startChat(product.seller_id)}
                            className="btn query-prodetail btn-outline-primary"
                          >Query about product</button>
                        </>
                        :
                        <>
                          <Link to="/signup" className="btn btn-warning w-50">Signup</Link>
                          <Link to="/login" className="btn btn-outline-warning w-50">Login</Link>
                          
                        </>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>

  );
}

export default ProductDetails;
