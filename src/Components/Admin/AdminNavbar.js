import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai'
import { BiMoviePlay } from 'react-icons/bi'
import { FaUserNinja } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import logo from "../../sflix.png";
import { useAuth, useTheme } from '../../Hooks/useTheme';
import { BsFillSunFill } from 'react-icons/bs'
const AdminNavbar = () => {
    const { toggleTheme } = useTheme()
    const { authInfo, handleLogout } = useAuth()


    return (
        <nav className='w-48 min-h-screen bg-[#0C1017] border-r border-gray-300 '>


            <div className='flex flex-col justify-between  h-screen  sticky top-0 px-4 py-2'>
                <ul className=' '>

                    <li className='mb-8'>
                        <NavLink className='flex items-center space-x-2 p-2' to='/'>
                            <img src={logo} alt="" className='h-16 ' />

                        </NavLink>
                    </li>
                    <li className='navTextColor'>
                        <NavLink className='flex items-center space-x-2 p-2' to='/'>
                            <AiOutlineHome size={24}></AiOutlineHome>
                            <span className='mt-2'>Home</span>

                        </NavLink>
                    </li>
                    <li className='navTextColor'>
                        <NavLink className='flex items-center space-x-2 p-2' to='/movies'>

                            <BiMoviePlay size={24}></BiMoviePlay>
                            <span className='mt-1'>Movies</span>

                        </NavLink>
                    </li>
                    <li className='navTextColor'>
                        <NavLink className='flex items-center space-x-2 p-2' to='/actors'>

                            <FaUserNinja size={24}></FaUserNinja>
                            <span className='mt-1'>Actors</span>
                        </NavLink>
                    </li>

                </ul>

                <div className=''>
                    <span className='ml-2 font-semibold text-xl text-white '>Admin</span>
                    <button
                        
                        onClick={handleLogout}
                        className='flex items-center space-x-2 text-[#655e5e] hover:text-white transition '>
                        <FiLogOut size={20} />
                        <span className='ml-2'> Logout</span>
                    </button>
                </div>
            </div>


        </nav>
    );
};

export default AdminNavbar;