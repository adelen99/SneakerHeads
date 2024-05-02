import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = () => {
  return (
    <section className='flex flex-col items-center py-20'>
      <h2 className='font-bold text-6xl py-4 '>404</h2>
      <h2 className='font-semibold text-center text-3xl py-8'>
        Sorry, the page you tried cannot be found
      </h2>
      <FontAwesomeIcon icon={faFaceSadCry} className='text-6xl py-4' />
      <Link to='/' className='button-primary '>
        back home
      </Link>
    </section>
  );
};

export default ErrorPage;
