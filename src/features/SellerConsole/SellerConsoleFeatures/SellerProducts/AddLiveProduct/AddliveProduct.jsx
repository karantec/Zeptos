import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PricesInput from './PricesInput/PricesInput';
import SpecsInput from './Specsinput/SpecsInput';
import { backend_url } from '../../../../../hooks/Auth';
import Loader from '../../../../../components/Loader';


const enforceWordLimit = (value, limit) => {
    const words = value
    if (words.length < limit) {
        return value;
    }
    return words.slice(0, limit)
};

function AddLiveProduct() {
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productAbout, setProductAbout] = useState('');
    const [categoryType, setCategoryType] = useState('agri products & equipments');
    const [unit, setUnit] = useState('')

    const [productImages, setProductImages] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    const [productDataList, setProductDataList] = useState([
        { price: '', quantityRange: { min: '', max: '' } },
    ]);
    const [specs, setSpecs] = useState([{ key: '', value: '' }]);

    // const [expireIn, setExpireIn] = useState()
    
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
        setProductName(enforceWordLimit(event.target.value, 100));
    };

    const productAboutChangeHandler = (event) => {
        setProductAbout(enforceWordLimit(event.target.value, 500));
    };

    const categoryTypeChangeHandler = (event) => {
        setCategoryType(event.target.value);
    }

    const productImagesChangeHandler = (event) => {
        const files = event.target.files;
        const imageFiles = Array.from(files); // Convert FileList to an array

        imageFiles.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProductImages(prevImages => [...prevImages, reader.result]);
                    console.log(reader.result); // Logging the newly read image
                }
            };

            reader.readAsDataURL(file);
        });
    };



    const productSubmitHandler = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        const token = localStorage.getItem('token')

        const productData = {
            product_name: productName,
            description: productAbout,
            prices: JSON.stringify(productDataList),
            specs: JSON.stringify(specs),
            category_type: categoryType,
            product_image: productImages,
            unit: unit,
            expireIn: "2 Days 2 hr 15min"
        }

        console.log(productData);
        

        // Use the Fetch API to make a POST request
        fetch(backend_url + '/api/products/uploadlive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(productData),
        }).then(response => {
            response.json().then(data => {
                setProductName('')
                setProductAbout('')
                setProductDataList([
                    { price: '', quantityRange: { min: '', max: '' } },
                ])
                setSpecs([{ key: '', value: '' }])
                setCategoryType('agri products & equipments')
                setProductImages([])
                setIsLoading(false)
                toast.success("uploaded product successfully")
            })
        }).catch(error => {
            setIsLoading(false)
            // Handle any errors that occurred during the fetch
            toast.error(error.content);
            return <p>error.message</p>
        });

    }

    // this is for image input ******************

    // const [images, setImages] = useState([]);

    // const handleImageChange = (event) => {
    //     const files = Array.from(event.target.files);
    //     const newImages = files.map(file => URL.createObjectURL(file));
    //     setImages(prevImages => [...prevImages, ...newImages]);
    // };

    // const removeImage = (index) => {
    //     setImages(prevImages => prevImages.filter((_, i) => i !== index));
    // };

    return (
        <>
            <ToastContainer />
            {
                isLoading ?
                    <Loader />
                    :
                    <div className="container">
                        <h2 className="mb-4">Upload Live Product</h2>

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

                            <PricesInput priceData={handlePricesChange} />

                            <SpecsInput specsData={handleSpecsChange} />

                            <div className="mb-3">
                                <label htmlFor="productImages" className="form-label">Product Images</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    id="productImages"
                                    accept="image/*"
                                    onChange={productImagesChangeHandler}
                                    multiple
                                    required
                                />
                            </div>

                            {/* //This is for image input *************** */}
                            {/* <div style={styles.container}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    style={styles.input}
                                />
                                <div style={styles.previewContainer}>
                                    {images.map((image, index) => (
                                        <div key={index} style={styles.imageContainer}>
                                            <img src={image} alt={`Preview ${index}`} style={styles.previewImage} />
                                            <button
                                                onClick={() => removeImage(index)}
                                                style={styles.removeButton}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* <div className="mb-3">
                    <label htmlFor="productCatalogue" className="form-label">Product Catalogue (PDF)</label>
                    <input
                        type="file"
                        name='pdf'
                        className="form-control"
                        id="productCatalogue"
                        onChange={productCatalogueChangeHandler}
                        accept=".pdf"
                    />
                </div> */}

                            <button type="submit" className="btn btn-primary">Upload Product</button>

                        </form >
                        <button className="btn btn-secondary" onClick={() => navigate('/seller_console/products')}>Cancel</button>
                    </div >
            }
        </>
    )
}

export default AddLiveProduct

//Style for image input 
// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: '20px',
//     },
//     input: {
//         margin: '10px 0',
//         padding: '10px',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//         fontSize: '16px',
//     },
//     previewContainer: {
//         marginTop: '20px',
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '10px',
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '150px',
//         height: '150px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         overflow: 'hidden',
//     },
//     previewImage: {
//         width: '100%',
//         height: '100%',
//         objectFit: 'cover',
//     },
//     removeButton: {
//         position: 'absolute',
//         top: '5px',
//         right: '5px',
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         border: 'none',
//         borderRadius: '50%',
//         cursor: 'pointer',
//         fontSize: '16px',
//         lineHeight: '16px',
//         width: '24px',
//         height: '24px',
//         textAlign: 'center',
//     },
// };