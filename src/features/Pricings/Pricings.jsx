import StandardPlan from "./StandardPlan/StandardPlan";

export default function Pricing() {
    return (
       <> 
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <StandardPlan />
                    </div>
                </div>
            </div>
        </>
    );
}