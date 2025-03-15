

export default function Step4(props) {

    return <>
        <h3 className="become_a_seller_h3">Business Details</h3>
        <div className="mb-3">
            <label htmlFor="businessCategory" className="form-label">
                Business or Category you serve
            </label>
            <input
                type="text"
                className="form-control"
                id="businessCategory"
                placeholder="Enter business category"
                value={props.businessCategory}
                onChange={(e) => props.setBusinessCategory(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="specialization" className="form-label">
                Specialization
            </label>
            <input
                type="text"
                className="form-control"
                id="specialization"
                placeholder="Enter specialization"
                value={props.specialization}
                onChange={(e) => props.setSpecialization(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="businessType" className="form-label">
                Type of Business
            </label>
            <select
                className="form-select"
                id="businessType"
                value={props.businessType}
                onChange={(e) => props.setBusinessType(e.target.value)}
                required
            >
                <option value="Wholesaler">Wholesaler</option>
                <option value="Retailer">Retailer</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Other">Other</option>
            </select>
            {props.businessType === "Other" && (
                <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Enter business type"
                    onChange={(e) => props.setOtherBusinessType(e.target.value)}
                    value={props.otherBusinessType}
                    required
                />
            )}
            {props.businessType === "Wholesaler" && (
                <div className="mt-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="stockiest"
                            checked={props.wholesalerOptions.stockiest}
                            onChange={() => props.handleWholesalerOptionChange('stockiest')}
                        />
                        <label className="form-check-label" htmlFor="stockiest">Stockiest</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="singleCategory"
                            checked={props.wholesalerOptions.singleCategory}
                            onChange={() => props.handleWholesalerOptionChange('singleCategory')}
                        />
                        <label className="form-check-label" htmlFor="singleCategory">Single Category</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="singleBrand"
                            checked={props.wholesalerOptions.singleBrand}
                            onChange={() => props.handleWholesalerOptionChange('singleBrand')}
                        />
                        <label className="form-check-label" htmlFor="singleBrand">Single Brand</label>
                    </div>
                </div>
            )}
            {props.businessType === "Manufacturer" && (
                <div className="mt-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="oem"
                            checked={props.manufacturerOptions.oem}
                            onChange={() => props.handleManufacturerOptionChange('oem')}
                        />
                        <label className="form-check-label" htmlFor="oem">OEM</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="odm"
                            checked={props.manufacturerOptions.odm}
                            onChange={() => props.handleManufacturerOptionChange('odm')}
                        />
                        <label className="form-check-label" htmlFor="odm">ODM</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="others"
                            checked={props.manufacturerOptions.others}
                            onChange={() => props.handleManufacturerOptionChange('others')}
                        />
                        <label className="form-check-label" htmlFor="others">Others</label>
                    </div>
                </div>
            )}
        </div>
        <div className="mb-3">
            <label htmlFor="productionCapabilities" className="form-label">
                Your Production or Sourcing Capabilities (optional)
            </label>
            <textarea
                className="form-control"
                id="productionCapabilities"
                placeholder="Enter production or sourcing capabilities"
                value={props.productionCapabilities}
                onChange={(e) => props.setProductionCapabilities(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="addons" className="form-label">
                Addons Related to your business (optional)
            </label>
            <textarea
                className="form-control"
                id="addons"
                placeholder="Enter addons related to your business"
                value={props.addons}
                onChange={(e) => props.setAddons(e.target.value)}
            />
        </div>
        <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={props.handlePrevStep}>Back</button>
            <button className="btn" style={{ background: "#ffb12c", borderColor: '#ffb12c', color: 'white' }} onClick={props.handleNextStep}>Next</button>
        </div>
    </>
}