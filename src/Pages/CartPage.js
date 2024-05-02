import React, { useEffect } from "react";
import { useCart } from "../context/cart_context";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, calculateTotal, removeItemFromCart, setCartItems } =
    useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const decreaseSneakerNumber = (item) => {
    if (item.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      removeItemFromCart(item);
    }
  };

  const increaseSneakerNumber = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  console.log(cartItems);
  return (
    <div className='flex justify-center items-center h-full p-4'>
      <div className='w-full max-w-3xl '>
        <ul className='bg-gray-300 rounded-lg'>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className='flex gap-8 justify-start p-12 border-b border-gray-200'>
              <div className='flex flex-col items-center '>
                <img
                  src={item.images[0]}
                  className='w-40 h-32 rounded-lg object-cover'
                />
              </div>
              <div className=''>
                <h2 className='text-md font-bold'>Name: {item.name}</h2>
                <p className='font-semibold'>Price: ${item.price}</p>
                <p className='text-sm'>Size: {item.size}</p>
                <div className='flex items-center'>
                  <p className='text-center mr-2'>Quantity:</p>
                  <button
                    className='mr-2'
                    onClick={() => decreaseSneakerNumber(item)}>
                    <FaMinus className='bg-gray-900 rounded-xl text-white' />
                  </button>
                  <p className='text-center'> {item.quantity}</p>
                  <button
                    className='ml-2'
                    onClick={() => increaseSneakerNumber(item)}>
                    <FaPlus className='bg-gray-900 rounded-xl text-white' />
                  </button>
                </div>
                <div className='flex flex-wrap items-center '>
                  <p className=''>Remove </p>
                  <FaTimes
                    className='border border-gray-900 rounded-full mt-1 ml-1'
                    onClick={removeItemFromCart}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {calculateTotal() === 0 && (
          <div className='flex flex-col justify-center'>
            <h2 className='text-xl flex justify-center capitalize'>
              Your cart is empty...
            </h2>
            <Link
              to='/products'
              className='button-primary capitalize text-center mt-5'>
              fill it
            </Link>
          </div>
        )}
        {calculateTotal() !== 0 && (
          <div className='font-bold text-xl flex justify-center bg-gray-300 py-5 '>
            <h2>Total : ${calculateTotal().toFixed(2)}</h2>
          </div>
        )}
        <div>
          {isAuthenticated && calculateTotal() !== 0 && (
            <Link to='/checkout'>
              <button className='button-primary w-full'>
                Proceed to Checkout
              </button>
            </Link>
          )}
          {!isAuthenticated && calculateTotal() !== 0 && (
            <button
              className='button-primary w-full capitalize'
              onClick={() => loginWithRedirect()}>
              Log in to proceed checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
