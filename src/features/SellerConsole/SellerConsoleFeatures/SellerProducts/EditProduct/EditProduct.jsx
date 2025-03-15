import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PricesInput from './PricesInput/PricesInput';
import SpecsInput from './SpecsInput/SpecsInput';
import { backend_url } from '../../../../../hooks/Auth';
import { GetProduct } from '../../../../../services/Apis';


export default function EditProduct() {
    const navigate = useNavigate();

    const productId = useParams()

    const [prevData, setPrevData] = useState({});

    useEffect(() => {
        console.log(prevData);
    }, [prevData])

    useEffect(() => {
        const fetchProduct = async () => {
            await GetProduct(productId['productId']).then((res) => {
                setPrevData(res);
                setProductName(res.product_name);
                setProductAbout(res.description);
                setCategoryType(res.category_type);
                setUnit(res.unit)
            })
        }
        fetchProduct()
    }, [])

    const [productName, setProductName] = useState('');
    const [productAbout, setProductAbout] = useState('');
    const [categoryType, setCategoryType] = useState('agri products & equipments');
    const [unit, setUnit] = useState('')

    const [productDataList, setProductDataList] = useState([
        { price: '', quantityRange: { min: '', max: '' } },
    ]);
    const [specs, setSpecs] = useState([{ key: '', value: '' }]);


    const handlePricesChange = (priceData) => {
        setProductDataList(priceData)
    }
    const handleSpecsChange = (specsData) => {
        setSpecs(specsData)
    }

    const unitChangeHandler = (event) => {
        setUnit(event.target.value)
    }

    const productNameChangeHandler = (event) => {
        setProductName(event.target.value);
    }

    const productAboutChangeHandler = (event) => {
        setProductAbout(event.target.value);
    }

    const categoryTypeChangeHandler = (event) => {
        setCategoryType(event.target.value);
    }

    const productSubmitHandler = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        const data = {
            product_name: productName,
            description: productAbout,
            prices: productDataList,
            specs: specs,
            category_type: categoryType,
            unit: unit
        }

        // Use the Fetch API to make a POST request
        fetch(backend_url + '/api/products/upload', {
            method: 'PUT',
            headers: {
                'token': token,
            },
            body: data,
        }).then(response => {
            response.json().then(data => {
                setProductName('')
                setProductAbout('')
                setCategoryType('agri products & equipments')
                setProductDataList([
                    { price: '', quantityRange: { min: '', max: '' } },
                ])
                setSpecs([{ key: '', value: '' }])
                toast.success("successfullt updated")
            })
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            toast.error(error.content);
            return <p>error.message</p>
        });

    }

    return (
        <>
            <ToastContainer />
            <div className="container">
                <h2 className="mb-4">Edit Product</h2>

                <form encType='multipart/form-data' onSubmit={productSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={productNameChangeHandler}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productAbout" className="form-label">Product Description</label>
                        <textarea
                            className="form-control"
                            id="productAbout"
                            rows="3"
                            placeholder="Enter description of the product"
                            value={productAbout}
                            onChange={productAboutChangeHandler}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryType" className="form-label">Category Type</label>
                        <select
                            className="form-select"
                            id="categoryType"
                            value={categoryType}
                            onChange={categoryTypeChangeHandler}
                            required
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

                    <div className="mb-3">
                        <label htmlFor="unit" className="form-label">Enter unit of quantity: (eg: kg)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="unit"
                            placeholder="kg"
                            value={unit}
                            onChange={unitChangeHandler}
                            required
                        />
                    </div>

                    <h4><b>Current product pricing</b></h4>
                    {/* {
                        prevData?
                        prevData.prices.map((price, index) => {
                            return <ul className="list-group" key={index}>
                                <li className="list-group-item">Price: {price.price}</li>
                                <li className="list-group-item">Quantity Range: {price.quantityRange.min} - {price.quantityRange.max}</li>
                            </ul>
                        })
                        :
                        undefined
                    } */}

                    <PricesInput priceData={handlePricesChange} />

                    <h4>Current specifications</h4>
                    {/* <ul className="list-group mb-3">
                    {
                        specs.map((spec, index) => {
                            return <li key={index} className="list-group-item">{spec.key} - {spec.value}</li>
                        })
                    }
                </ul> */}

                    <SpecsInput specsData={handleSpecsChange} />

                    <button type="submit" className="btn btn-primary">Save Product</button>

                </form >
                <button className="btn btn-secondary" onClick={() => navigate('/seller_console/products')}>Cancel</button>
            </div >
        </>

    )
}
