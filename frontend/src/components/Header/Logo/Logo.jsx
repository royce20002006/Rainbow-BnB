
import './Logo.css'
import { NavLink } from 'react-router-dom'
import { LuRainbow } from "react-icons/lu";

export default function Logo() {
  return (
    <div className='mainDiv'>
        <NavLink className='rainbowLogo' to='/'><LuRainbow /></NavLink>
        <NavLink to='/'>RainbowBnB</NavLink>
    </div>
  )
}
