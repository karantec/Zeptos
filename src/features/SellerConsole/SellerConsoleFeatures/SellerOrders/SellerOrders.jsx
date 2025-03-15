import SellerPageLayout from "../../SellerConsoleComponents/SellerPageLayout";
import AllOrdersTable from "./SubComponents/AllOrdersTable";
import FullFilledOrders from "./SubComponents/FullFilledOrders";
import Listings from "./SubComponents/Listings";


export default function SellerOrders() {

    return (
        <>
            <SellerPageLayout />
            <FullFilledOrders />
            <Listings />
            {/* <AllOrdersTable /> */}
        </>
    )
}