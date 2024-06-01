import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";
import { FaBookMedical, FaPlus, FaArrowLeft } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { Tile } from '../ui/tile';

const NavPane = () => {
    return (
      <header className={'flex flex-col h-screen min-w-92 m-1 p-2.5 gap-2.5 rounded-md bg-container'}>
        <div className='flex justify-between'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <Button size="icon" variant="ghost"><FaArrowLeft className='text-xl'/></Button>
            <Button size="icon" variant="ghost"><FaMagnifyingGlass className='text-xl'/></Button>
            <Button size="icon" variant="ghost"><FaPlus className='text-xl'/></Button>
          </div>
          
        </div>

        {/* <Button variant="nav"> */}
          <NavLink to="/">
            <FaHouse />Home
          </NavLink>
        {/* </Button> */}
        <div className='grid grid-flow-col gap-2.5 justify-stretch w-full'>
          <Button variant="nav"><BiSolidCategory />Categories</Button>
          <Button variant="nav"><FaBookMedical />My library</Button>
        </div>

        <div className={'flex flex-col h-4/5 pt-0 p-4 gap-2.5 rounded-md bg-card'}>
          <div className='flex justify-between w-full'>
            <Button className="p-0 text-outline-foqreground" variant="nav"><MdCollectionsBookmark />Collections</Button>
            <Button className="inline-block" variant="outline" size="sm"><FaPlus /></Button>
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

      </header>
    );
};

export default NavPane;