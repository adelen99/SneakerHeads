import React from "react";
import { Footer } from "../components";
const AboutPage = () => {
  return (
    <>
      <div className='background2 flex flex-col items-start justify-center min-h-screen px-8  '>
        <h1 className='text-4xl font-bold text-stone-100 mb-8 hover:text-gray-400 transition-colors duration-300 cursor-pointer  '>
          Welcome to SneakerHeads - Where Style Meets Comfort
        </h1>
        <h2 className='text-2xl font-semibold text-stone-100 mb-6 '>
          Explore the Latest Trends in Footwear Fashion
        </h2>
        <div className='flex flex-col '>
          <p className='text-lg text-gray-100 mb-6 max-w-xl'>
            At SneakerHeads, we're passionate about providing you with the most
            stylish and comfortable sneakers on the market. Step into our world
            of cutting-edge designs, premium materials, and unbeatable comfort.
            Whether you're a dedicated sneaker enthusiast or simply looking for
            your next favorite pair, we've got you cover.
          </p>
          <p className='text-lg text-gray-100 mb-6 max-w-xl'>
            Browse our curated collection of iconic brands, limited editions,
            and must-have styles to elevate your sneaker game. Join the
            SneakerHeads community and stay ahead of the fashion curve with our
            exclusive releases and insider updates. Your journey to exceptional
            style starts here at SneakerHeads.
          </p>
          <p className='text-lg text-gray-100 mb-6 max-w-xl'>
            With our commitment to quality and customer satisfaction, we ensure
            that every pair of sneakers you purchase from us exceeds your
            expectations. Whether you're hitting the streets or stepping into
            the gym, our sneakers will accompany you every step of the way.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
