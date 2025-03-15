


export default function Step1(props) {

    return <>
        <h3 className="become_a_seller_h3">Business Information</h3>
        <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
                Company Name
            </label>
            <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Enter company name"
                value={props.companyName}
                onChange={(e) => props.setCompanyName(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="businessAddress" className="form-label">
                Business Address
            </label>
            <input
                type="text"
                className="form-control"
                id="businessAddress"
                placeholder="Enter business address"
                value={props.businessAddress}
                onChange={(e) => props.setBusinessAddress(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="businessPincode" className="form-label">
                Business Pincode
            </label>
            <input
                type="text"
                className="form-control"
                id="businessPincode"
                placeholder="Enter business pincode"
                value={props.businessPincode}
                onChange={(e) => props.setBusinessPincode(e.target.value)}
                required
            />
        </div>
        <button className="btn w-100" style={{ background: "#ffb12c", borderColor: '#ffb12c', color: 'white' }} onClick={props.handleNextStep}>
            Next
        </button>
    </>
}