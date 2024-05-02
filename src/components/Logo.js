import React from "react";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div>
      <Link to='/'>
        <div className='text-3xl font-bold italic text-red-600'>
          SneakerHeads.
        </div>
      </Link>
    </div>
  );
};

export default Logo;
