import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";


import '../../SellerConsoleStyles/SellerProducts.css';
import SellerPageLayout from '../../SellerConsoleComponents/SellerPageLayout';
import Loader from '../../../../components/Loader';
import { backend_url } from '../../../../hooks/Auth';
import { DeleteProduct } from '../../../../services/Apis';

// const products = [
//     {
//         id: 1,
//         name: 'Product 1',
//         image: 'https://via.placeholder.com/100', // Replace with actual image URL
//         price: '$100',
//         svg: '10',
//         status: 'Approved',
//         date: '2024-07-01',
//         issueDescription: 'No issues',
//         actionRequired: 'None',
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         image: 'https://via.placeholder.com/100', // Replace with actual image URL
//         price: '$150',
//         svg: '5',
//         status: 'Low Stocks',
//         date: '2024-06-25',
//         issueDescription: 'You Need to Add the Stocks',
//         actionRequired: 'Add Stocks',
//     },
//     {
//         id: 3,
//         name: 'Product 3',
//         image: 'https://via.placeholder.com/100', // Replace with actual image URL
//         price: '$200',
//         svg: '8',
//         status: 'Approved',
//         date: '2024-06-20',
//         issueDescription: 'No issues',
//         actionRequired: 'None',
//     },
//     {
//         id: 4,
//         name: 'Product 4',
//         image: 'https://via.placeholder.com/100', // Replace with actual image URL
//         price: '$250',
//         svg: '7',
//         status: 'Approval required',
//         date: '2024-06-18',
//         issueDescription: 'Pending approval',
//         actionRequired: 'Submit documents',
//     },
//     {
//         id: 5,
//         name: 'Product 5',
//         image: 'https://via.placeholder.com/100', // Replace with actual image URL
//         price: '$300',
//         svg: '12',
//         status: 'Approved',
//         date: '2024-06-15',
//         issueDescription: 'No issues',
//         actionRequired: 'None',
//     },
//     {
//         id: 6,
//         name: 'Product 6',
//         image: 'https://via.placeholder.com/100', // Replace with actual image URL
//         price: '$350',
//         svg: '4',
//         status: 'Approval required',
//         date: '2024-06-10',
//         issueDescription: 'Pending approval',
//         actionRequired: 'Submit documents',
//     },
//     // Add more products as needed
// ];



export default function SellerProducts() {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [isDeleted, setIsDeleted] = useState(false)


    // const filteredProducts = products
    //     .filter(product => filter === 'All' || product.status === filter)
    //     .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true)
            await fetch(backend_url + '/api/products/seller', {
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.products);
                    setIsLoading(false)
                    // console.log(data.products);
                })
                .catch((err) => {
                    setIsLoading(false)
                    alert(err.message)
                    console.log(err.message);
                    return <p>{err.message}</p>;
                });
        };
        getProducts();
    }, [isDeleted]);


    const deleteHandler = async (productId) => {
        var confirmation = confirm("Are you sure you want to delete this product?")
        if (confirmation) {
            setIsLoading(true);
            await DeleteProduct(productId)
                .then((res) => {
                    setIsLoading(false);
                    setIsDeleted(!isDeleted)
                })
                .catch((err) => {
                    setIsLoading(false)
                    setIsDeleted(!isDeleted)
                    alert(err.message)
                    console.log(err.message);
                    return <p>{err.message}</p>;
                });
        }
    }

    return (
        <>

            <SellerPageLayout />

            {
                isLoading ?
                    <Loader />
                    :

                    <div className="product-table-container">
                        <div className="header">
                            <h2>{filter} Products</h2>
                            {/* <Link to="/seller_console/products/add_live_product">
                                <button className="add-live-product-button">Add Product In Live Market</button>
                            </Link> */}
                            <Link to="/seller_console/products/add_product">
                                <button className="add-product-button">Add Product</button>
                            </Link>
                        </div>
                        <nav className="product-nav">
                            {/* <div className="filters">
                                <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
                                <button onClick={() => setFilter('Approved')} className={filter === 'Approved' ? 'active' : ''}>Approved</button>
                                <button onClick={() => setFilter('Low Stocks')} className={filter === 'Low Stocks' ? 'active' : ''}>Low Stocks</button>
                                <button onClick={() => setFilter('Approval required')} className={filter === 'Approval required' ? 'active' : ''}>Approval Required</button>
                            </div> */}
                            <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </nav>
                        <table className="product-table">
                            <thead>
                                <tr>
                                    {/* <th><input type="checkbox" /></th> */}
                                    {/* <th>Image</th> */}
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    {/* <th>Price</th> */}
                                    {/* <th>Last 30 Days Sells</th> */}
                                    {/* <th>Status</th> */}
                                    {/* <th>Date</th> */}
                                    {/* <th>Issue Description</th> */}
                                    {/* <th>Action Required</th> */}
                                    <th>View Detail</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length==0?
                                    <h2>No products are uploaded yet ... <Link to="add_product">Start uploading now</Link> </h2>
                                    :

                                    products.map((product) => (
                                        <tr key={product.product_id}>
                                            {/* <td><input type="checkbox" /></td> */}
                                            {/* <td><img src={product.image} alt={product.product_name} className="product-image" /></td> */}
                                            <td>{product.product_name}</td>
                                            <td>{product.category_type}</td>
                                            {/* <td>{product.price}</td> */}
                                            {/* <td>{product.svg}</td> */}
                                            {/* <td>{product.status}</td> */}
                                            {/* <td>{product.date}</td>
                                        <td>{product.issueDescription}</td>
                                        <td>{product.actionRequired}</td> */}
                                            <td>
                                                <Link to={"/product_details/" + product.product_id} className="m-2 btn btn-primary">View Detail</Link>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link to={"/seller_console/products/edit_product/" + product.product_id} className="m-1 btn btn-outline-warning"><FaEdit size={25} /></Link>
                                                    <Link onClick={() => deleteHandler(product.product_id)} className="btn btn-outline-danger"><RiDeleteBin2Fill size={20} /></Link>

                                                </div>
                                            </td>
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    );
}
