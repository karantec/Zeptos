// explore

import '../Home_styles/Layer6.css'

export default function Layer6() {
    return (
        <>
            <div className='explore' >
                <div className="explore-h">
                    <p>Exploring Bejinesses</p>
                </div>
                <div className="explore-p">
                    <p>Bejiness connects B2B buyers and suppliers in India. Buyers find high quality and certified products at best prices</p>
                </div>
                <div className="card-group explore-grp">
                    <div className="card">
                        <img src="/home/manufacturer.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Browse Manufacturers</h5>
                            <p className="card-text">Connecting Bejinesses with Trusted manufaturer: Our B2B marketplace facilitates linking buyers with reputable mahufacturer, ensuring products at competitive prices</p>
                            {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                        </div>
                    </div>
                    <div className="card">
                        <img src="/home/wholesaler.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Find Wholesaler Suppliers</h5>
                            <p className="card-text">Unloack access to top watch product of competitive rates. Our platform simplifies the search for trusted wholesalers, ensuring quality souring tailored to your requirements</p>
                            {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                        </div>
                    </div>
                    <div className="card">
                        <img src="/home/retailer.png" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Retailer Resellers Discover</h5>
                            <p className="card-text">Expand your Reach with Bejiness.com Whether entering new cities, exploring divrse industries, or aiming for expanding Bejiness our platform empowers you to seamlessly reach with the ideal retailers for your Bejiness.</p>
                            {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}