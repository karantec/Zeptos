import "../Home_styles/FeaturedOn.css";

export default function FeaturedOn() {
    return (
        <div className="container mb-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2 featured-h1">
                Featured On
            </h2>
            <div className="d-flex justify-content-center">
                <div className="">
                    <a target="_blank" href="https://theentrepreneurstory.com/featured/bejiness-com-closing-the-gap-between-indian-msmes-and-opportunities/">
                        <img src="https://theentrepreneurstory.com/wp-content/uploads/2020/08/cropped-project_20200820_1008596-0.png" alt="Your Image" className="featuredimg" />
                    </a>
                </div>
            </div>
        </div>
    );
}