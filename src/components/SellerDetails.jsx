import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CgProfile } from "react-icons/cg";


import { backend_url } from "../hooks/Auth";
import Loader from "./Loader";
import PageLayout from "./PageLayout";
import { useAuth } from "../features/Auth/AuthContext";
import Navbar from '../pages/Home/sub_components/Navbar'


// POST http://localhost:3000/api/users/seller/:sellerId
export default function SellerDetails() {

    const id = useParams();
    const navigate = useNavigate()
    const { setToken } = useAuth()

    const [hasToken, setHasToken] = useState(null)

    const [sellerData, setSellerData] = useState({})
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hovered, setHovered] = useState(-1);


    const handleShare = async () => { 
        if (navigator.share) { 
            try { 
                await navigator.share({ 
                    title: sellerData.company_name + " Profile", 
                    text: sellerData.company_name, 
                    url: window.location.href, 
                }); 
                console.log('Link shared successfully'); 
            } catch (error) { 
                console.error('Error sharing link:', error); 
            } 
        } else { 
            console.log('Web Share API is not supported in your browser.'); 
        } 
    };


    useEffect(() => {

        setHasToken(localStorage.getItem('token'));

        const fetchSeller = async () => {

            setIsLoading(true)

            await fetch(backend_url + `/api/users/seller/${id.sellerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            }).then(res => {
                // if (res.status == "invalid-token") {
                //     localStorage.setItem('token', '');
                //     localStorage.setItem('userData', '')
                //     setToken(localStorage.getItem('token'));
                //     navigate("/login")
                // }
                res.json().then((data) => {
                    setSellerData(data)
                    setProducts(data.products)
                    setIsLoading(false)
                })
            }).catch(error => {
                setIsLoading(false)
                console.error(error.content)
            })
        }
        fetchSeller();
    }, [])

    return (
        <>
            {
                hasToken ?
                    <PageLayout />
                    :
                    <Navbar />
            }
            {
                isLoading ?
                    <Loader />
                    :
                    <>
                        <div className="d-flex">
                        <h2 className="m-3">Seller Details!</h2>
                        <button className="btn btn-info m-3" onClick={handleShare}>Share</button>

                        </div>
                      
                        <div className="p-4 row profile-details" style={{ border: '3px dashed #ffb12c' }}>
                            <div className="col-md-4 text-center">
                                {/* Display profile picture */}
                                <div className="profile-picture-container">
                                    {
                                        sellerData.profile_image ?
                                            <img
                                                src={sellerData.profile_image}
                                                alt="Profile"
                                                className="seller-profile-picture mt-1"
                                            />
                                            :
                                            <CgProfile size={102} />
                                    }
                                </div>
                            </div>
                            <div className="col-md-8">
                                <table className="m-3">
                                    <tbody>
                                        <tr>
                                            <th>Company Name:</th>
                                            <td>{sellerData.company_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Business Category:</th>
                                            <td>{sellerData.bussiness_type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <h1>Explore products of {sellerData.company_name}!</h1>

                        <div className="row cards-container d-flex mt-5">

                            {
                                (products.length) != 0 ?

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
                                                    src={product.images[0]}
                                                    alt={product.product_name}
                                                />
                                                <div className={`card-body d-flex flex-column`}>
                                                    <h5 className="card-title">{product.product_name}</h5>
                                                    {/* <p className="card-text">{product.description}</p> */}
                                                    <p className="card-text">
                                                        <b>{product.prices[product.prices.length - 1].price}rs</b></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <h2><br />No products yet!</h2>
                            }
                        </div>
                    </>
            }
        </>
    )
}