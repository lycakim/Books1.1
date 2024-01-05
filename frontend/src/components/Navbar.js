import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "./auth"
import { useEffect, useState } from "react"
import { Outlet } from 'react-router-dom'

export const Navbar = () => {
  const nvgt = useNavigate()
  const auth = useAuth()
  const [isToken, setIsToken] = useState()
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'none'
    }
  }
  const handleLogout = () => {
    auth.logout()
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    nvgt('/', { replace: true })
  }

  useEffect(() => {
    const data = window.localStorage.getItem('token');
    if (data !== null) {
      setIsToken(true);
    }
    else {
      setIsToken(false);
    }
  }, [])

  return (
    <div>
      <div className="sidebar">
        <div><h1 className="logo font-bold text-3xl">Books 1.1</h1></div>
        <div>
          <NavLink style={navLinkStyles} to='/user/dashboard'>Dashboard</NavLink>
          <NavLink style={navLinkStyles} to='/user/upload-book'>Upload Books</NavLink>
        </div>

        {isToken && (
          <div onClick={handleLogout} className="logoutBtn">Logout</div>
        )}

      </div >
      <div className='content'>
        <div className='content2'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
