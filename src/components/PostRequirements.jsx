import React, { useState } from 'react';
import PageLayout from './PageLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { backend_url } from '../hooks/Auth';

export default function PostRequirements() {

    const [productRequirements, setProductRequirements] = useState({
        productName: '',
        productQuantity: '',
        productDetails: '',
        categoryType: 'agri products & equipments'
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductRequirements((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const requirementsFormHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        setProductRequirements({
            productName: '',
            productQuantity: '',
            productDetails: '',
            categoryType: 'agri products & equipments'
        })

        try {
            const response = await fetch(backend_url + '/api/users/post_requirements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    product_name: productRequirements.productName,
                    quantity: productRequirements.productQuantity,
                    product_details: productRequirements.productDetails,
                    category_type: productRequirements.categoryType
                }),
            });
            const data = await response.json();
            if (!data.success) {
                toast.error(data.content);
                setIsLoading(false);
            }else{
                toast.success("Uploaded your requirements")
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Server side error: " + error.message);
        }

    }

    return (
        <>
            <PageLayout />
            <ToastContainer />
            {
                isLoading ?
                    <Loader />
                    :
                    <div className="container d-flex justify-content-center align-items-center" >
                        <div className="card" style={{ maxWidth: '800px', width: '100%' }}>

                            <div className="card-body">
                                <h1 style={{
                                    fontSize: '2em',
                                    background: '-webkit-linear-gradient(45deg, #ff6ec4, #7873f5)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Enter Required Product Details</h1>
                                <form onSubmit={requirementsFormHandler}>
                                    <div>
                                        <img src="home/bejiness-logo.png" alt="" style={{ height: '60px' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productCategory" className="form-label" style={{ fontSize: '1.2em' }}>Select Product Category</label>
                                        <select className="form-control"
                                            name="categoryType"
                                            value={productRequirements.categoryType}
                                            onChange={handleInputChange}
                                            id="productCategory"
                                            style={{ fontSize: '1.2em' }}
                                        >
                                            <option value="agri products & equipments">Agri Products & Equipments</option>
                                            <option value="apparel & fashion">Apparel & Fashion</option>
                                            <option value="architects & interior designing">Architects & Interior Designing</option>
                                            <option value="automobile parts & spares">Automobile Parts & Spares</option>
                                            <option value="chemicals dyes & solvents">Chemicals, Dyes & Solvents</option>
                                            <option value="construction real & estate">Construction & Real Estate</option>
                                            <option value="consumer electronics">Consumer Electronics</option>
                                            <option value="electricals & electronics">Electricals & Electronics</option>
                                            <option value="energy & power">Energy & Power</option>
                                        </select>
                                    </div>
                                    <div className="form-row d-flex">
                                        <div className="form-group col-md-6" style={{ marginRight: '10px' }}>
                                            <label htmlFor="productName" className="form-label" style={{ fontSize: '1.2em' }}>Enter Product Name</label>
                                            <input
                                                type="text"
                                                value={productRequirements.productName}
                                                className="form-control"
                                                name='productName'
                                                onChange={handleInputChange}
                                                id="productName"
                                                placeholder="Enter the product name"
                                                style={{ fontSize: '1.2em' }}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="productQuantity" className="form-label" style={{ fontSize: '1.2em' }}>Enter Product Quantity</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min={1}
                                                name='productQuantity'
                                                onChange={handleInputChange}
                                                value={productRequirements.productQuantity}
                                                id="productQuantity"
                                                placeholder="Enter the product quantity"
                                                style={{ fontSize: '1.2em' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Notes" className="form-label" style={{ fontSize: '1.2em' }}>Enter Product Details</label>
                                        <textarea
                                            className="form-control"
                                            id="Notes"
                                            rows="2"
                                            name='productDetails'
                                            onChange={handleInputChange}
                                            value={productRequirements.productDetails}
                                            placeholder="Product details goes here"
                                            style={{ fontSize: '1.2em' }}
                                        ></textarea>
                                    </div>
                                    {/* <div className="form-row d-flex">
                                <div className="form-group col-md-6" style={{ marginRight: '10px' }}>
                                    <label htmlFor="mobileNumber" className="form-label" style={{ fontSize: '1.2em' }}>Your Mobile Number</label>
                                    <input type="tel" className="form-control" id="mobileNumber" placeholder="Enter your mobile number" style={{ fontSize: '1.2em' }} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="email" className="form-label" style={{ fontSize: '1.2em' }}>Your Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" style={{ fontSize: '1.2em' }} />
                                </div>
                            </div> */}
                                    <button type="submit" className="btn btn-primary mt-3" style={{ fontSize: '1.2em' }}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}
