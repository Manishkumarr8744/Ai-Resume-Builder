import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, setLoading } from '../Store/Features/authSlice';
import Loader from './Loader';

const Navbar = () => {
    const {user,loading}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const logoutUser=()=>{
        dispatch(setLoading(true))
        dispatch(logout());
        dispatch(setLoading(false))
        navigate('/');
    }

    if(loading){
        return <Loader/>
    }
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to={'/'}>
                <h1 className='text-xl font-bold'>Resume Builder</h1>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max:sm-hidden'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-white hover:bg-slate-50  border border-gray-300 px-7 py-1.5 rounded-full active:scale:95 transition-all'>Logout</button>
            </div>

        </nav>
    </div>
  )
}

export default Navbar