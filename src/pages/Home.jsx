import Banner from "../components/Banner";
import FeaturedCars from "../components/FeaturedCars";

import SpecialOffers from "../components/SpecialOffers";

import WhyChooseUs from "../components/WhyChooseUs";

import CarviaStats from "../components/CarviaStats";
import FAQ from "../components/FAQ";
import CarCareTips from "./CarCareTips";
import CustomerReviews from "../components/CustomerReviews";

const Home = () => {
  return (
    <>
      <Banner></Banner>
       <WhyChooseUs />
      <FeaturedCars />
     <FAQ /> 
     <CarCareTips />
      <SpecialOffers />
    < CustomerReviews /> 
     <CarviaStats />
    </>
  );
};

export default Home;
