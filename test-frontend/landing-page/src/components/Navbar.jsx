import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logo, lock, hamburgerMenu, close } from '../assets';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <div className='w-full h-[80px] bg-white border-b'>
      <div className='md:max-w-[1400px] max-w-[600px] m-auto w-full h-full flex justify-between items-center'>
        <img src={logo} className="h-[25px]" alt="Logo" />
        <div className='hidden md:flex items-center'>
          <ul className='flex gap-4'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/createjob">Create Job</Link></li>
            <li><Link to="/getjobs">Get Jobs</Link></li>
          </ul>
        </div>
        <div className='hidden md:flex'>
          <Link to="/login" className='flex justify-between items-center bg-transparent px-6 gap-2'>
            <img src={lock} alt="Lock icon" />
            login
          </Link>
          <Link to="/signup" className='px-8 py-3 rounded-md bg-[#20B486] text-white font-bold'>
            sign up for free
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className='md:hidden' onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} alt="Menu icon" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={toggle ? 'absolute z-10 p-4 bg-white w-full px-8 md:hidden' : 'hidden'}>
        <ul>
          <li><Link to="/" className='p-4 hover:bg-gray-100'>Home</Link></li>
          <li><Link to="/about" className='p-4 hover:bg-gray-100'>About</Link></li>
          <li><Link to="/support" className='p-4 hover:bg-gray-100'>Support</Link></li>
          <li><Link to="/createjob" className='p-4 hover:bg-gray-100'>Create Job</Link></li>
          <li><Link to="/getjobs" className='p-4 hover:bg-gray-100'>Get Jobs</Link></li>
          <div className='flex flex-col my-4 gap-4'>
            <Link to="/login" className='border border-[#20B486] flex justify-center items-center bg-transparent px-6 gap-2 py-4'>
              <img src={lock} alt="Lock icon" />
              login
            </Link>
            <Link to="/signup" className='px-8 py-5 rounded-md bg-[#20B486] text-white font-bold'>
              sign up for free
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
