import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import PostRequirements from './components/PostRequirements'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Blogs from './features/Blogs/Blogs'
import Login from './features/Auth/Login/Login'
import Signup from './features/Auth/Signup/Signup'
import HomeSearch from './pages/Home/sub_components/HomeSearch'
import Dashboard from './features/Dashboard/Dashboard'
import Notification from './features/Notification/Notification'
import Cart from './features/Cart/Cart'
import BuyerProfile from './features/Profiles/BuyerProfile'
import SellerProducts from './features/SellerConsole/SellerConsoleFeatures/SellerProducts/SellerProducts'
import ProductDetails from './components/ProductDetails'
import OrderDetails from './components/OrderDetails'
import NotificationDetails from './features/Notification/NotificationDetails'
import BlogDetail from './features/Blogs/BlogDetails'
import SearchResult from './features/SearchResult'
import TermsAndConditions from './pages/Home/Agreements/TermsAndConditions'
import PrivacyAndPolicy from './pages/Home/Agreements/PrivacyAndPolicy'
import ReturnAndPolicy from './pages/Home/Agreements/ReturnAndPolicy'
import SellerContract from './features/SellerContract,jsx/SellerContract'
import SellerDetails from './components/SellerDetails'
import SellerDashboard from './features/SellerConsole/SellerConsoleFeatures/SellerDashboard/SellerDashboard'
import SellerOrders from './features/SellerConsole/SellerConsoleFeatures/SellerOrders/SellerOrders'
import AddProduct from './features/SellerConsole/SellerConsoleFeatures/SellerProducts/AddProduct/AddProduct'
import EditProduct from './features/SellerConsole/SellerConsoleFeatures/SellerProducts/EditProduct/EditProduct'
import UserChat from './features/UserChat/UserChat'
import ChatRoom from './features/UserChat/ChatRoom'
import SellerStartChat from './features/SellerConsole/SellerConsoleFeatures/SellerChats/SellerStartChat'
import SellerChatRoom from './features/SellerConsole/SellerConsoleFeatures/SellerChats/SellerChatRoom'
import AddLiveProduct from './features/SellerConsole/SellerConsoleFeatures/SellerProducts/AddLiveProduct/AddliveProduct'
import Pricing from './features/Pricings/Pricings'

// secret temp
import SecretLogin from './features/Auth/Login/SecretLogin'

function App() {

  return (
    <>
      <Routes>

        {/* public pages */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<SecretLogin />} />

        <Route path="/search" element={<HomeSearch />} />
        <Route path="/post_requirements" element={<PostRequirements />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
        <Route path="/privacy_and_policy" element={<PrivacyAndPolicy />} />
        <Route path="/return_and_policy" element={<ReturnAndPolicy />} />
        <Route path="/pricings" element={<Pricing />} />
        


        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/blog/:title/:id" element={<BlogDetail />} />
              
        {/* private pages */}
        <Route path="/live_market" element={<Dashboard />} />
        <Route path="/live_market/search" element={<SearchResult />} />
        <Route path="/seller_contract" element={<SellerContract />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/view_cart" element={<Cart />} />
        <Route path="/profile" element={<BuyerProfile />} />
        <Route path="/chats" element={<UserChat />} />
        <Route path="/chats/:roomId" element={<ChatRoom />} />

        <Route path="/seller/:sellerId" element={<SellerDetails />} />
        <Route path="/order_details/:orderId" element={<OrderDetails />} />
        <Route path="/notificationdetails/:id" element={<NotificationDetails />} />
        <Route path="/product_details/:productId" element={<ProductDetails />} />

        {/* seller console pages  */}

        <Route path="/seller_console" element={<SellerDashboard />} />
        <Route path="/seller_console/products" element={<SellerProducts />} />
        <Route path="/seller_console/products/add_product" element={<AddProduct />} />
        <Route path="/seller_console/products/add_live_product" element={<AddLiveProduct />} />
        <Route path="/seller_console/orders" element={<SellerOrders />} />
        <Route path="/seller_console/chats" element={<SellerStartChat />} />
        <Route path="/seller_console/chats/:roomId" element={<SellerChatRoom />} />


        <Route path="/seller_console/products/edit_product/:productId" element={<EditProduct />} />



        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
