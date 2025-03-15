import { Link } from "react-router-dom";


export default function Step5(props) {

    return <>
        <h3 className="become_a_seller_h3">Terms & Conditions</h3>
        <div className="mb-3 form-check">
            <input
                type="checkbox"
                className="form-check-input"
                id="term1"
                name="term1"
                checked={props.termsValues.term1}
                onChange={(e) => props.setTermsValues({ ...props.termsValues, term1: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="term1">
                <Link to="/terms_and_conditions" target="_blank">
                    I agree to the terms and conditions
                </Link>
            </label>
        </div>
        <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={props.handlePrevStep}>Back</button>
            <button className="btn btn-success" disabled={!props.isFormValid()} onClick={props.SellerContractHandler}>
                Submit & Register
            </button>
        </div>
    </>
}