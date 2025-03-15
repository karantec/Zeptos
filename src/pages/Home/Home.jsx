import { useEffect } from "react";

import Layer1 from "./sub_components/Layer1";
import Layer2 from "./sub_components/Layer2";
import Layer3 from "./sub_components/Layer3";
// import Layer4 from "./sub_components/Layer4";
import Layer5 from "./sub_components/Layer5";
import Layer6 from "./sub_components/Layer6";
import Layer7 from "./sub_components/Layer7";
import Footer from "./sub_components/Footer";
import Post from './sub_components/Post';
import '../../styles/Home.css'
import Navbar from "./sub_components/Navbar";
import WhyChooseBejiness from "./sub_components/WhyChooseBejiness";
import ProblemSolutionTable from "./sub_components/ProblemSolutionTable";
import HowItWorks from "./sub_components/HowItWorks";
import DiscountTags from "./sub_components/DiscountTags";
import FeaturedOn from "./sub_components/FeaturedOn";

export default function Home() {

  // useEffect(() => {
  //   alert('🚧 Our website is still a work in progress. Join Bejiness and stay tuned for more! 🚧');
  // }, [])

  return (
    <div className="homep-main">
      <Navbar isScrolled={true} />
      <Layer1 />

      <Layer2 />
      <Layer3 />
      {/* <Layer4 /> */}
      <Layer5 />
      <WhyChooseBejiness />
      <ProblemSolutionTable />
      <HowItWorks />
      <DiscountTags />
      <Layer6 />
      <FeaturedOn />
      <Layer7 />
      <Footer />
      <Post />

    </div>
  )
}