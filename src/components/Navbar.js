import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { links } from "../utils/constants";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Reset sidebar state when screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Close the sidebar when screen size is greater than or equal to medium size
      if (window.innerWidth >= 768 && showSidebar) {
        setShowSidebar(false);
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [showSidebar]);

  return (
    <nav className='bg-black sticky top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between border-gray-500 p-8 text-white'>
      <Logo />

      <div>
        <div className='w-full justify-center'>
          <ul className='hidden w-full  md:flex lg:gap-8 md:gap-4 md:text-sm lg:text-base '>
            {links.map((link) => {
              const { id, text, url } = link;
              return (
                <li
                  key={id}
                  className='hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
            <li className='mt-1 mr-2 hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
              <Link to='/cart'>
                <FaCartShopping />
              </Link>
            </li>
            {isAuthenticated && (
              <li className='relative  mr-2 hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
                <h2 className='ml-8'>Hi, {user.name}</h2>
                {user.picture ? (
                  <img
                    src={user.picture}
                    className='rounded-xl absolute top-0 w-1/6 '
                  />
                ) : null}
              </li>
            )}
            {isAuthenticated ? (
              <li className='hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }>
                  Log Out
                </button>
              </li>
            ) : (
              <li className='hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
                <button onClick={() => loginWithRedirect()}>Log in</button>
              </li>
            )}
          </ul>
        </div>

        <div className='md:hidden '>
          <button onClick={toggleSidebar}>
            {showSidebar ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {showSidebar && (
        <div className='flex flex-basis-full flex-col items-center basis-full'>
          <ul className='text-white p-8'>
            {links.map((link) => {
              const { id, text, url } = link;
              return (
                <li
                  key={id}
                  className='hover:text-red-600 transition-colors duration-300 cursor-pointer'>
                  <Link to={url} onClick={toggleSidebar}>
                    {text}
                  </Link>
                </li>
              );
            })}

            <li className='hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
              <Link to='/cart' onClick={toggleSidebar}>
                Cart
              </Link>
            </li>

            {isAuthenticated ? (
              <li className='hover:text-red-600 hover:font-bold transition-all duration-3000 cursor-pointer'>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }>
                  Log Out
                </button>
              </li>
            ) : (
              <li className=' hover:text-red-600 transition-colors duration-300 cursor-pointer'>
                <button onClick={() => loginWithRedirect()}>Log in</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
