import React, { useContext } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";
import { FaBookMedical, FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { Tile } from '../ui/tile';
import { UserContext } from '@/App';
import { useQuery } from '@tanstack/react-query';
import genericFetch from '@/hooks/genericFetch';

const NavPane = ({className}) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const {data: collections, isLoading} = useQuery({
    queryFn: () => genericFetch({path: `tealists`, search: `author.id=${user}`}),
    queryKey: [`tealists`],
    cacheTime: 0
  });

    return (
      <header className={`flex flex-col h-screen w-full sm:w-auto min-w-92 m-1 p-2.5 gap-2.5 rounded-md bg-container ${className}`}>
        <div className='flex justify-between'>
          <Avatar>
            <AvatarImage src="img/teaCard-bg.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {user}
          <div className='flex'>
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
            <div className='bg-card rounded-md'>
              <Button className="rounded-md" onClick={() => navigate(-1)} size="icon" variant="ghost">
                  <FaArrowLeft className='text-xl'/>
              </Button>
              <Button className="rounded-md" onClick={() => navigate(+1)} size="icon" variant="ghost">
                  <FaArrowRight className='text-xl'/>
              </Button>
            </div>
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

        <div className={'flex flex-1 h-1/5 flex-col pt-0 p-4 gap-2.5 rounded-md bg-card'}>
          <div className='flex justify-between items-center w-full'>
            <Button asChild className="p-0 text-outline-foreground" variant="nav">
              <NavLink to="collections">
                <MdCollectionsBookmark />Collections
              </NavLink>
            </Button>
            <Button className="h-fit" variant="outline" size="sm"><FaPlus /></Button>
          </div>
          <div className='w-full overflow-scroll rounded-md grid grid-cols-2 gap-2.5'>
            {collections?.map(
              collection => <Tile key={collection.id}>{collection.title}</Tile>
              )
            }
          </div>
        </div>
      </header>
    );
};

export default NavPane;