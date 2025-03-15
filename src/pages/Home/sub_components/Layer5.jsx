// trends

import React, { useEffect, useState } from 'react';
import { SearchProducts } from "../../../services/Apis";
import { useNavigate } from "react-router-dom";

import '../Home_styles/Layer5.css';


export default function Layer5() {

    const [products, setProducts] = useState([]);

    const [hovered, setHovered] = useState(-1);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            // setIsLoading(true)
            try {
                await SearchProducts('').then((data) => {
                    // setIsLoading(false)
                    var arr = data.products.filter((ele) => ele.is_top_product === true);
                    setProducts(arr);
                })

            } catch (error) {
                // setIsLoading(false)
                console.error("Error occurred while fetching user data:", error);
            }
        };

        fetchProducts();

    }, [])

    useEffect(() => {
        console.log(products);
    }, [products])

    return (
        <>
            {
                products.length != 0 ?
                    <>

                        <div>
                            <p className="why-choose-title m-2">Trending Products In Market</p>
                        </div>
                        <div className="row cards-container d-flex mx-auto justify-content-center">
                            {
                                products.map((product, index) => (
                                    <div onClick={() => navigate("/product_details/" + product.product_id)} style={{ cursor: "pointer" }} className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 d-flex dash-prod-card" key={index}>
                                        <div
                                            className={`card ${hovered === index ? 'shadow-lg' : 'shadow'} flex-grow-1`}
                                            onMouseEnter={() => setHovered(index)}
                                            onMouseLeave={() => setHovered(-1)}
                                        >
                                            <img
                                                className="card-img-top"
                                                height={100}
                                                width={100}
                                                src={product.images}
                                                alt={product.product_name}
                                            />
                                            <div className={`card-body d-flex flex-column`}>
                                                <p className="card-title">{product.product_name}</p>
                                                {/* <p className="card-text">{product.description}</p> */}
                                                <p className="card-text">
                                                    <b>{product.prices[product.prices.length - 1].price}rs</b>
                                                </p>
                                            </div>

                                            <div className="d-flex border-top">
                                                {/* {
                                product.seller.profile_image ?
                                    <img
                                        src={product.seller.profile_image}
                                        style={{border: 'none', borderRadius: '50%'}}
                                        alt="Profile"
                                        height={35}
                                        width={35}
                                        className="m-2"
                                    />
                                    :
                                    <CgProfile size={25} className="m-2"/>
                            } */}
                                                <p className="d-inline m-2">{product.seller.seller_company}</p>
                                                {/* {
                                product.seller.is_seller_verified ? */}
                                                <p className="d-inline m-2">
                                                    <img
                                                        src="/home/bejiness-verified.png"
                                                        width="25"
                                                        height="25"
                                                        alt="Bejiness Verified"
                                                    />
                                                </p>

                                                {/* } */}
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    :
                    undefined
            }

        </>
    );
}
