import React from 'react';
import { Button } from './button';
import { AiFillHome } from 'react-icons/ai';

const Section = ({title, children}) => {
    return (
      <div className={'w-full bg-secondary'}>
        <div className='flex justify-between mb-3'>
          <h2 className='text-3xl'>{title}</h2>
          <div className='flex p-0'>
            <Button variant="ghost" size="sm"><AiFillHome /></Button>
            <Button variant="ghost" size="sm">Show more</Button>
          </div>
        </div>
        <div className='w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          { children }
        </div>
      </div>
    );
};

export default Section;