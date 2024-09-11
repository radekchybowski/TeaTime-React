import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({value, className}) => {
  
    return (
      <div className={`flex items-center ${className}`}>
        <i>
          <FaRegStarHalfStroke />
        </i>
        <span className='text-base ml-1'>
          {value ? value : '-'}
        </span>
      </div>
    );
};

export default Rating;