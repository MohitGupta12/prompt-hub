'use client';

import {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    
    const setUpProviders = async()=>{
      const response = await getProviders();  
      setProviders(response);
    }
    setUpProviders();
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
        {session?.user?(
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post 
          </Link>
          <button className="outline_btn" type="button" onClick={signOut} >
            Sign Out
          </button>
          <Link href="/profile">
            <Image
            src={session?.user.image}
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
            Sign In
          </button>  
        ))}
        </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user?(
          <div className="flex">
            <Image
              className="rounded-full"
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              onClick={()=>(setToggleDropdown((prev)=>!prev))}
            />
           {toggleDropdown && <div className="dropdown">
              <Link 
                className="dropdown_link"
                href="/profile"
                onClick={()=>setToggleDropdown(false)}
              >
              My Profile
              </Link>
              <Link 
                className="dropdown_link"
                href="/create-prompt"
                onClick={()=>setToggleDropdown(false)}
              >
              Create Prompt
              </Link>
              <button 
                className="black_btn w-full mt-5" 
                type="button"
                onClick={()=>{
                  setToggleDropdown(false)
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>}
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
            Sign In
          </button>
        ))}
        </>
        )}

      </div>
    
    </nav>
  )
}

export default Nav