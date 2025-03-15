

export default function StandardPlan() {
    return (
        <>
            <h1 className="fs-2 fw-bold text-dark text-center">PRICING</h1>
            <p className="fs-5 text-secondary text-center">Choose your best plan</p>
            <div className="card shadow-lg w-100 mx-auto" style={{ maxWidth: "450px", backgroundColor: "#f9fafd" }}>
                <div className="card-header text-center text-white fw-bold fs-4" style={{ backgroundColor: "#ffb12c" }}>
                    Bejiness Pro Plan
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Company Webpage</span>
                            <span className="text-success fw-bold">✔</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Product Listing</span>
                            <span className="text-success fw-bold">Unlimited</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Ad Spend</span>
                            <span className="text-success fw-bold">✔</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Data & Reporting</span>
                            <span className="text-success fw-bold">✔</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Receive Inquiries</span>
                            <span className="text-success fw-bold">Unlimited</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Dedicated A/c Manager</span>
                            <span className="text-success fw-bold">✔</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Access to Bejiness Console</span>
                            <span className="text-success fw-bold">✔</span>
                        </li>
                    </ul>

                    <div className="alert alert-warning text-center fw-bold fs-5 mt-3">
                        <span className="text-decoration-line-through text-muted me-2">₹20,000</span> ₹7,000/year
                    </div>
                    <button className="btn w-100 fw-bold" style={{ backgroundColor: "#ffb12c" }}>Select Package</button>
                </div>
            </div>
        </>
    );
}