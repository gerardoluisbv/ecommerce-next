'use client';

import Link from 'next/link';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import { useEffect, useState } from 'react';


export const TopMenu = () => {

  const openSideMenu = useUIStore( state => state.openSideMenu );
  const totalItemsCart = useCartStore( state => state.getTotalItems());

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    
    setLoaded(true);
  
  }, [])
  

  return (
    <nav className="flex px-5 justify-between items-center w-full">

      {/* Logo */ }
      <div>
        <Link
          href="/">
          <span className={ `${ titleFont.className } antialiased font-bold` } >Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */ }
      <div className="hidden sm:block">

        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>

      </div>


      {/* Search, Cart, Menu */ }
      <div className="flex items-center">

        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href= {
          ((totalItemsCart > 0) && loaded )
            ? "/cart" 
            : "/empty"            
          } className="mx-2">
          <div className="relative">
            {
             ( loaded && totalItemsCart > 0) && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  { totalItemsCart }
                </span>
              )
            }          
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={ openSideMenu }
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menú
        </button>

      </div>


    </nav>
  );
};