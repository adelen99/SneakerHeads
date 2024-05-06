import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";
import { FaCartPlus, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useCart } from "../context/cart_context";
import { toast } from "react-toastify";

const SingleProductPage = () => {
  const [sneakers, setSneakers] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0); // Track the index of the main image
  const [mainImage, setMainImage] = useState("");
  const { id } = useParams();
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("sneakers")
          .select()
          .eq("id", id);

        if (error) {
          throw error;
        }
        setSneakers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleImageClick = (imageUrl) => {
    // Update the main image index to the clicked image index
    const imageIndex = sneakers[0].images.findIndex(
      (image) => image === imageUrl
    );
    setMainImageIndex(imageIndex);
  };

  const handleLeftArrowClick = () => {
    // Decrease the main image index by 1
    setMainImageIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? sneakers[0].images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleRightArrowClick = () => {
    // Increase the main image index by 1
    setMainImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % sneakers[0].images.length;
      return newIndex;
    });
  };

  const handleAddToCart = (product) => {
    addItemToCart(product);
    toast.success("Item added to cart!");
  };

  return (
    <>
      {sneakers.map((sneaker) => (
        <section
          key={sneaker.id}
          className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:mt-10'>
          <article>
            <div className='relative'>
              <img
                src={sneaker.images[mainImageIndex]}
                alt=''
                className='w-full lg:rounded-2xl h-auto'
                style={{ height: "500px" }}
              />
              <ul>
                <li>
                  <button
                    className='bg-white rounded-full shadow absolute p-5 left-4 top-1/2'
                    onClick={handleLeftArrowClick}>
                    <FaChevronLeft />
                  </button>
                </li>
                <li>
                  <button
                    className='bg-white rounded-full shadow absolute p-5 right-4 top-1/2'
                    onClick={handleRightArrowClick}>
                    <FaChevronRight />
                  </button>
                </li>
              </ul>
            </div>{" "}
            <ul className='hidden lg:flex items-center justify-start gap-5 flex-wrap mt-5'>
              {sneaker.images.map((image, index) => (
                <li
                  key={index}
                  className={`${
                    image === mainImage &&
                    "border-2 border-red-600 opacity-80 rounded-2xl"
                  } border-2 border-transparent rounded-2xl overflow-hidden cursor-pointer`}>
                  <img
                    src={image}
                    alt={sneaker.name}
                    className='w-30 h-20  rounded-xl'
                    onClick={() => handleImageClick(image)}
                  />
                </li>
              ))}
            </ul>
          </article>

          <article className='px-8 pb-10'>
            <h2 className='bg-slate-100 py-1 px-2 text-red-500 uppercase tracking-wide text-sm font-bold inline-block rounded shadow'>
              company : {sneaker.brand}
            </h2>
            <h1 className='text-slate-900 mb-5 font-bold text-3xl lg:text-4xl'>
              {sneaker.name}
            </h1>
            <p className='text-slate-600 mb-5 leading-relaxed'>
              {sneaker.description}
            </p>
            <div className='flex flex-wrap items-center justify-between'>
              <ul className='flex items-center gap-5'>
                <li className='text-slate-900 font-bold text-2xl'>
                  ${sneaker.price}
                </li>
                <li className='bg-gray-100 py-1 px-2 text-red-500 uppercase tracking-wide text-sm font-bold inline-block rounded shadow my-5'>
                  Size available : {sneaker.size}
                </li>
              </ul>
            </div>

            <div className='text-center'>
              <button
                onClick={() => handleAddToCart(sneaker)}
                className='flex items-center justify-center gap-4 text-white bg-slate-900 py-2 px-4 rounded-lg shadow mt-5 w-full cursor-pointer'>
                <FaCartPlus />
                Add to cart
              </button>
            </div>
          </article>
        </section>
      ))}
    </>
  );
};

export default SingleProductPage;
