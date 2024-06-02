import React from 'react';
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = () => {
    return (
      <div className='flex items-center'>
        <i>
          <FaRegStarHalfStroke />
        </i>
        <span className='text-base ml-1'>
          9.1
        </span>
      </div>
    );
};

export default Rating;