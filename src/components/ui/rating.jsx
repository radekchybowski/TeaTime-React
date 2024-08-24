import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({children}) => {
    return (
      <div className='flex items-center'>
        <i>
          <FaRegStarHalfStroke />
        </i>
        <span className='text-base ml-1'>
          {children}
        </span>
      </div>
    );
};

export default Rating;