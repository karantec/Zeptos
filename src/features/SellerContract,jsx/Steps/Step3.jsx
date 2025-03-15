

export default function Step3(props) {

    return <>
        <h3 className="become_a_seller_h3">Bank Details</h3>
        <div className="mb-3">
            <label htmlFor="bankName" className="form-label">
                Bank Name
            </label>
            <input
                type="text"
                className="form-control"
                id="bankName"
                placeholder="Enter bank name"
                value={props.bankName}
                onChange={(e) => props.setBankName(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="accountNumber" className="form-label">
                Account Number
            </label>
            <input
                type="text"
                className="form-control"
                id="accountNumber"
                placeholder="Enter account number"
                value={props.accountNumber}
                onChange={(e) => props.setAccountNumber(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="reEnterAccountNumber" className="form-label">
                Re-enter Account Number
            </label>
            <input
                type="text"
                className="form-control"
                id="reEnterAccountNumber"
                placeholder="Re-enter account number"
                value={props.reEnterAccountNumber}
                onChange={(e) => props.setReEnterAccountNumber(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="accountType" className="form-label">
                Type of Account
            </label>
            <input
                type="text"
                className="form-control"
                id="accountType"
                placeholder="Enter account type"
                value={props.accountType}
                onChange={(e) => props.setAccountType(e.target.value)}
                required
            />
        </div>
        <div className="mb-3">
            <label htmlFor="ifscCode" className="form-label">
                IFSC Code
            </label>
            <input
                type="text"
                className="form-control"
                id="ifscCode"
                placeholder="Enter IFSC code"
                value={props.ifscCode}
                onChange={(e) => props.setIfscCode(e.target.value)}
                required
            />
        </div>
        <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={props.handlePrevStep}>Back</button>
            <button className="btn" style={{ background: "#ffb12c", borderColor: '#ffb12c', color: 'white' }} onClick={props.handleNextStep}>Next</button>
        </div>
    </>
}