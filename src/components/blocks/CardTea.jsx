import React from 'react';
import { Button } from '../ui/button';
import Rating from '../ui/rating';
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function CardTea() {
    return (
        <div className='text-left max-w-64 min-w-44 bg-card rounded-lg overflow-hidden shadow-md'>
          <img className="h-24 w-full object-cover" src="/img/teaCard-bg.jpg" alt="" />
          <div className='p-2.5 pb-4'>
            <div className='flex justify-between'>
              <Rating></Rating>
              <div>
                <Button className="mr-1.5" size="sm" variant="outline"><FaRegHeart className='text-lg'/></Button>
                <Button className="" size="sm" variant="outline"><FaRegPlusSquare className='text-lg'/></Button>
              </div>
            </div>
            <h3 className='text-2xl font-medium'>Pure Angel</h3>
            <span className='text-xl text-primary'>White tea</span>
            <p className='mt-1 text-wrap text-card-foreground'>White tea, chocolate, orchidds
            dsds
            dsdsdsdsdsdsdsdsds
            dsdsdsd sdsds...</p>
          </div>
          
        </div>
    );
}