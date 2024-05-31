import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AiFillHome } from 'react-icons/ai';
import InnerContainer from '../ui/innerContainer';
import { Tile } from '../ui/tile';

const NavPane = () => {
    return (
      <div className={'flex flex-col h-screen min-w-92 m-1 p-2.5 gap-2.5 rounded-md bg-secondary'}>
        <div className='flex justify-between'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <Button size="icon" variant="ghost"><AiFillHome /></Button>
            <Button size="icon" variant="ghost"><AiFillHome /></Button>
            <Button size="icon" variant="ghost"><AiFillHome /></Button>
          </div>
          
        </div>

        <Button variant="nav"><AiFillHome />Home</Button>
        <div className='grid grid-flow-col gap-2.5 justify-stretch w-full'>
          <Button variant="nav"><AiFillHome />Categories</Button>
          <Button variant="nav"><AiFillHome />My library</Button>
        </div>

        <div className={'flex flex-col justify-center items-center h-screen py-2 px-4 gap-2.5 rounded-md bg-primary'}>
          <div className='flex justify-between w-full'>
            <Button className="p-0 text-outline-foreground" variant="nav"><AiFillHome />Collections</Button>
            <Button className="inline-block" variant="outline" size="sm"><AiFillHome /></Button>
          </div>
          <div className='w-full overflow-scroll rounded-md grid grid-cols-2 gap-2.5'>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
            <Tile>Dupsko</Tile>
          </div>
          
        </div>

      </div>
    );
};

export default NavPane;