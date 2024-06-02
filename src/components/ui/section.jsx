import React from 'react';
import { Button } from './button';
import { AiFillHome } from 'react-icons/ai';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Section = ({title, children, className}) => {
    return (
      <div className={`w-full ${className}`}>
        <div className='flex justify-between mb-3'>
          <h2>{title}</h2>
          <div className='flex p-0'>
            <Button variant="ghost" size="sm"><FaMagnifyingGlass/></Button>
            <Button variant="ghost" size="sm">Show more</Button>
          </div>
        </div>
        <div className='w-full flex flex-wrap gap-4'>
          { children }
        </div>
      </div>
    );
};

export default Section;