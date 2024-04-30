import React from "react";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useSneakerData } from "../context/sneakers_context";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Hero = () => {
  // const { featuredSneakers } = useSneakerData();
  const [sneakers, setSneakers] = useState([]);
  const navigate = useNavigate();
  const navigateToSingleProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("sneakers")
          .select()
          .eq("featured", true);

        if (error) {
          throw error;
        }
        setSneakers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key={stars.length} />);
    }

    return stars;
  };

  return (
    <div className='flex flex-wrap gap-4 justify-center p-4'>
      {sneakers.map((sneaker) => (
        <div
          key={sneaker.id}
          className='card flex flex-col justify-between w-full sm:w-1/3 lg:w-72 hover:bg-gray-300'>
          {/* image */}
          <img
            src={sneaker.images[0]}
            className='w-full h-64 object-cover' // Set fixed height
            alt={sneaker.name} // Add alt attribute for accessibility
          />

          <div className='p-5 flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <span className='badge'>stock ready</span>
              <span className='badge'>official store</span>
            </div>

            {/* title */}
            <h2 className='product-title' title={sneaker.name}>
              {sneaker.name}
            </h2>

            {/* price */}
            <div>
              <span className='text-xl font-bold'>${sneaker.price}</span>
            </div>

            {/* old price */}
            <div className='flex items-center gap-2 mt-1'>
              <span className='text-sm line-through opacity-50'>
                ${sneaker.price + 100}
              </span>
              <span className='discount-percent'>best deal</span>
            </div>

            {/* stars */}
            <span className='flex items-center mt-1'>
              {renderStars(sneaker.rating)}
              <span className='text-xs ml-2 text-gray-500'>
                {sneaker.numberOfReviews} reviews
              </span>
            </span>

            {/* button */}
            <div className='mt-5 flex gap-2'>
              <button
                className='button-primary'
                onClick={() => navigateToSingleProduct(sneaker.id)}>
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
