import React from 'react';
import {NavLink} from "react-router-dom";
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";
import { FaBookMedical, FaPlus, FaArrowLeft } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { Tile } from '../ui/tile';

const NavPane = ({className}) => {
    return (
      <header className={`flex flex-col h-screen w-full sm:w-auto min-w-92 m-1 p-2.5 gap-2.5 rounded-md bg-container ${className}`}>
        <div className='flex justify-between'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <Button asChild size="icon" variant="ghost">
              <NavLink to="/">
                <FaArrowLeft className='text-xl'/>
              </NavLink>
            </Button>
            <Button asChild size="icon" variant="ghost">
              <NavLink to="search">
                <FaMagnifyingGlass className='text-xl'/>
              </NavLink>
            </Button>
            <Button asChild size="icon" variant="ghost">
              <NavLink to="add-tea">
                <FaPlus className='text-xl'/>
              </NavLink>
            </Button>
          </div>
        </div>

        <Button asChild variant="nav">
          <NavLink to="/">
            <FaHouse /> Home
          </NavLink>
        </Button>
        <div className='grid grid-flow-col gap-2.5 justify-stretch w-full'>
          <Button asChild variant="nav">
            <NavLink to="categories">
              <BiSolidCategory /> Categories
            </NavLink>
          </Button>
          <Button asChild variant="nav">
            <NavLink to="library">
            <FaBookMedical /> My library
            </NavLink>
          </Button>
        </div>

        <div className={'flex h-4/5 flex-col pt-0 p-4 gap-2.5 rounded-md bg-card'}>
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