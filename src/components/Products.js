import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSneakerData } from "../context/sneakers_context";

const Products = () => {
  const navigate = useNavigate();
  const data = useSneakerData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Extracting unique categories and brands
  const uniqueCategories = Array.from(
    new Set(data.allSneakers.map((sneaker) => sneaker.category))
  );
  const uniqueBrands = Array.from(
    new Set(data.allSneakers.map((sneaker) => sneaker.brand))
  );

  const uniqueGender = Array.from(
    new Set(data.allSneakers.map((sneaker) => sneaker.gender))
  );

  const navigateToSingleProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand === "All Brands" ? "" : brand);
  };

  const handleGenderFilter = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleSearchFilter = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered sneakers based on the selected category and brand
  const filteredSneakers = data.allSneakers.filter(
    (sneaker) =>
      (selectedCategory ? sneaker.category === selectedCategory : true) &&
      (selectedBrand ? sneaker.brand === selectedBrand : true) &&
      (selectedGender ? sneaker.gender === selectedGender : true) &&
      (searchQuery
        ? sneaker.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div className='flex flex-col items-center '>
      {/* Brand filter buttons */}
      <div className='grid grid-cols-1 gap-2 lg:flex lg:space-x-4 m-4'>
        <button
          className={`px-4 py-2 bg-gray-900 rounded text-white hover:bg-red-500 ${
            selectedBrand === "" ? "bg-red-600 text-white" : "text-gray-700"
          }`}
          onClick={() => handleBrandFilter("All Brands")}>
          All Brands
        </button>
        {uniqueBrands.map((brand) => (
          <button
            key={brand}
            className={`px-4 py-2 bg-gray-900 rounded text-white hover:bg-red-500 ${
              selectedBrand === brand
                ? "bg-red-600 text-white"
                : "text-gray-700"
            }`}
            onClick={() => handleBrandFilter(brand)}>
            {brand}
          </button>
        ))}
      </div>
      {/* Search input */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search sneakers...'
          value={searchQuery}
          onChange={handleSearchFilter}
          className='p-2 rounded border-gray-900'
        />
      </div>

      {/* Category filter dropdown */}
      <div className='mb-4'>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='p-2 rounded border'>
          <option value=''>All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Gender Filter */}
      <div>
        <select
          value={selectedGender}
          onChange={handleGenderFilter}
          className='p-2 rounded border capitalize'>
          <option value=''>All Genders</option>
          {uniqueGender.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered sneakers */}
      <div className='flex flex-wrap gap-8 justify-center p-4 w-5/6'>
        {filteredSneakers.map((sneaker) => (
          <div
            key={sneaker.id}
            className='card flex flex-col justify-between w-full sm:w-1/2  lg:w-96 hover:bg-gray-300'>
            {/* Sneaker details */}
            <img
              src={sneaker.images[0]}
              className='w-full h-64 object-cover'
              alt={sneaker.name}
            />
            <div className='p-5 flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <span className='badge'>stock ready</span>
              </div>
              <h2 className='product-title' title={sneaker.name}>
                {sneaker.name}
              </h2>
              <div>
                <span className='text-xl font-bold'>${sneaker.price}</span>
              </div>
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
    </div>
  );
};

export default Products;
