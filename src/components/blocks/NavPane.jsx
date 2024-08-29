import React, { memo, useContext, useEffect } from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";
import { FaBookMedical, FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCollectionsBookmark } from "react-icons/md";
import { Tile } from '../ui/tile';
import { useQuery } from '@tanstack/react-query';
import genericFetch from '@/hooks/genericFetch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Cookies from 'js-cookie';
import CategoryTile from './CategoryTile';
import { AuthContext } from '@/App';

const NavPane = ({className}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext.auth.user;

  const {data: categories, isLoading} = useQuery({
    queryFn: () => genericFetch({path: `categories`}),
    queryKey: [`tealists`],
    cacheTime: 0
  });

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

    return (
      <header className={`flex flex-col h-screen w-full sm:w-auto min-w-92 m-1 p-2.5 gap-2.5 rounded-md bg-container ${className}`}>
        <div className='flex justify-between'>
        <DropdownMenu className="relative">
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="img/teaCard-bg.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute top-0 left-0">
            <DropdownMenuItem>{user.name} {user.surname}</DropdownMenuItem>
            <DropdownMenuItem><Link to="/settings">Settings</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        <Button asChild variant="nav">
          <NavLink to="library">
          <FaBookMedical /> My library
          </NavLink>
        </Button>
        

        <div className={'flex flex-1 h-1/5 flex-col pt-0 p-4 gap-2.5 rounded-md bg-card'}>
        <Button asChild className="p-0 mt-1 text-outline-foreground flex-0" variant="nav">
              <NavLink to="categories">
                <BiSolidCategory /> Categories
              </NavLink>
            </Button>
          <div className='w-full overflow-scroll rounded-md grid grid-cols-2 gap-2.5'>
            {categories?.map(
              category => <CategoryTile key={category.id} properties={category}>{category.title}</CategoryTile>
              )
            }
          </div>
        </div>
      </header>
    );
};

export default memo(NavPane);