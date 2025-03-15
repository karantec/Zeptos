

export default function Step2(props) {

    return <>
        <h3 className="become_a_seller_h3">Business License & Proprietor Information</h3>
        <div className="mb-3">
            <label className="form-label">Business License Type</label>
            <div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="gst"
                        name="businessLicenseType"
                        value="GST"
                        checked={props.businessLicenseType === "GST"}
                        onChange={(e) => props.setBusinessLicenseType(e.target.value)}
                        required
                    />

                    <label className="form-check-label" htmlFor="gst">GST</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="pan"
                        name="businessLicenseType"
                        value="PAN"
                        checked={props.businessLicenseType === "PAN"}
                        onChange={(e) => props.setBusinessLicenseType(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="pan">PAN</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="msme"
                        name="businessLicenseType"
                        value="MSME"
                        checked={props.businessLicenseType === "MSME"}
                        onChange={(e) => props.setBusinessLicenseType(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="msme">MSME</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="businessRegistration"
                        name="businessLicenseType"
                        value="Business Registration"
                        checked={props.businessLicenseType === "Business Registration"}
                        onChange={(e) => props.setBusinessLicenseType(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="businessRegistration">Business Registration</label>
                </div>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="businessLicenseImage" className="form-label">
                Upload Business License Document
            </label>
            <input
                type="file"
                className="form-control"
                id="businessLicenseImage"
                accept="image/*"
                onChange={props.businessLicenseImageHandler}
                required
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Proprietor Document Type</label>
            <div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="aadhar"
                        name="proprietorDocumentType"
                        value="Aadhar"
                        checked={props.proprietorDocumentType === "Aadhar"}
                        onChange={(e) => props.setProprietorDocumentType(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="aadhar">Aadhar Card</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="panCard"
                        name="proprietorDocumentType"
                        value="PAN"
                        checked={props.proprietorDocumentType === "PAN"}
                        onChange={(e) => props.setProprietorDocumentType(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="panCard">PAN Card</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="passport"
                        name="proprietorDocumentType"
                        value="Passport"
                        checked={props.proprietorDocumentType === "Passport"}
                        onChange={(e) => props.setProprietorDocumentType(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="passport">Passport</label>
                </div>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="proprietorDocumentImage" className="form-label">
                Upload Proprietor Document
            </label>
            <input
                type="file"
                className="form-control"
                id="proprietorDocumentImage"
                accept="image/*"
                onChange={props.proprietorDocumentImageHandler}
                required
            />
        </div>
        <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={props.handlePrevStep}>Back</button>
            <button className="btn" style={{ background: "#ffb12c", borderColor: '#ffb12c', color: 'white' }} onClick={props.handleNextStep}>Next</button>
        </div>
    </>
}