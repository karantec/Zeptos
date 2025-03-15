import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../sub_components/Navbar";
import { SearchProducts } from "../../../services/Apis";
import Loader from "../../../components/Loader"


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function HomeSearch() {

    const [products, setProducts] = useState([]);
    const query = useQuery().get('q');
    const [hovered, setHovered] = useState(-1);
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                await SearchProducts(query).then((data) => {
                    setIsLoading(false)
                    setProducts(data.products.slice(0, 6));
                })

            } catch (error) {
                setIsLoading(false)
                console.error("Error occurred while fetching user data:", error);
            }
        };

        fetchProducts();

    }, [query])

    return (
        <>
            <Navbar />

            <div className="row cards-container d-flex mt-5 justify-content-center">
                {
                    isLoading ?
                        <Loader />
                        :
                        products.length != 0 ?
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
                                                        style={{ border: 'none', borderRadius: '50%' }}
                                                        alt="Profile"
                                                        height={35}
                                                        width={35}
                                                        className="m-2"
                                                    />
                                                    :
                                                    <CgProfile size={25} className="m-2" />
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
                            :
                            <h1>Sorry, we could not find your product!! <br />Let us know your Requirements...</h1>
                }
            </div>
        </>
    )
}