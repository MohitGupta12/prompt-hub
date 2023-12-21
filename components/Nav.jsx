'use client';

import {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    
    const setProvider = async()=>{
      const response = await getProviders();  
      setProviders(response);
    }
    setProviders();
  }, [])
  
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
        src="/assets/images/logo.svg"
        alt="Prompt Hub Logo"
        height={30}
        width={30}
        className="object-contain"
        />
        <p className="logo_text">Prompt Hub</p>
      </Link>
      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {isUserLoggedIn?(
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post 
          </Link>
          <button className="outline_btn" type="button" onClick={signOut} >
            Sign Out
          </button>
          <Link href="/profile">
            <Image
            src="/assets/images/logo.svg"
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            />
          </Link>
        </div>
        ):(
        <>
        {providers && Object.values(providers).map((provider)=>(
          <button
            type="button"
            key={provider.name}
            onClick={()=>signIn(provider.id)}
            className='black_btn'
          >
          </button>
        ))}
        </>
        )}
      </div>
    
    </nav>
  )
}

export default Nav