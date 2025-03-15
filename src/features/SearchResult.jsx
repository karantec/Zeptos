import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SearchProducts } from "../services/Apis";
import Loader from "../components/Loader";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import { useAuth } from "./Auth/AuthContext";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function SearchResult() {
    const navigate = useNavigate()
    const {setToken} = useAuth()
    const query = useQuery().get('q');

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     console.log(products)
    // }, [products]) 

    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            try {
                await SearchProducts(query).then((data) => {
                    if (data.status == "invalid-token") {
                        localStorage.setItem('token', '');
                        localStorage.setItem('userData', '')
                        setToken(localStorage.getItem('token'));
                        navigate("/login")
                    }
                    setProducts(data.products);
                    setIsLoading(false);
                })

            } catch (error) {
                console.error("Error occurred while fetching user data:", error);
            }
        };

        fetchProducts();

    }, [query])

    return (
        <>
            <PageLayout>
                {
                    !isLoading ?
                        products.length != 0 ?
                            <Card products={products} />
                            :
                            <h1>Sorry, we could not find your product!!</h1>
                        :
                        <Loader />
                }
            </PageLayout>
        </>
    )
}