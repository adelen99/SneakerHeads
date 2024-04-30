import React from "react";
import {
  Footer,
  Hero,
  HomePageDescription,
  Carousel,
  HeroTitle,
} from "../components";

const Home = () => {
  return (
    <div className='backgroundHero '>
      <div className='flex flex-col sm:flex-row'>
        <div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
          <HeroTitle />
        </div>
        <div className='w-full sm:w-1/2'>
          <Carousel />
        </div>
      </div>
      <HomePageDescription />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
