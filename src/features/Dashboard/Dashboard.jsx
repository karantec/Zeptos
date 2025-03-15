import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/Dashboard.css';
import { GetCategory, GetLiveCategory } from '../../services/Apis';
import DashCategory from './Dash_category';
import Loader from '../../components/Loader';
import PageLayout from "../../components/PageLayout";
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import Post from '../../components/Post'
import LiveMarket from '../LiveMarket/LiveMarket';

export default function Dashboard() {
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const [categoryTitle, setCategoryTitle] = useState('All');
  const [products, setProducts] = useState([]);
  const [liveProducts, setLiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setDataFetched(false);
        await GetCategory(categoryTitle.toLowerCase()).then((data) => {
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
        setIsLoading(false);
        toast.error("error in fetching the data: ", error.content)
        console.error("Error occurred while fetching user data:", error);
      } finally {
        setDataFetched(true)
      }
    };
    fetchProduct();
    const fetchLiveProduct = async () => {
      try {
        setIsLoading(true);
        await GetLiveCategory(categoryTitle.toLowerCase()).then((data) => {
          if (data.status === "invalid-token") {
            localStorage.setItem('token', '');
            localStorage.setItem('userData', '');
            setToken(localStorage.getItem('token'));
            navigate("/login");
          }
          setLiveProducts(data.products);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        toast.error("Error in fetching the data: " + error.content);
        console.error("Error occurred while fetching user data:", error);
      }
    };
    fetchLiveProduct();

  }, [categoryTitle]);

  const highlightButton = (btn) => {
    setCategoryTitle(btn);
  };

  return (
    <>
      <ToastContainer />
      <PageLayout />
      <DashCategory highlightButton={highlightButton} />
      {/* <LiveMarket products={liveProducts} /> */}
      {isLoading ? (
        <Loader />
      ) : dataFetched ? (
        products.length !== 0 ? (
          <Card products={products} />
        ) : (
          <h2><br />Coming soon ...</h2>
        )
      ) : <Loader />}
      <Post />
    </>
  );
}