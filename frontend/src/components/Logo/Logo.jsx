import React from 'react'
import './Logo.css'
import { NavLink } from 'react-router-dom'
import { LuRainbow } from "react-icons/lu";

export default function Logo() {
  return (
    <div className='mainDiv'>
        <NavLink className='rainbowLogo' to='/'><LuRainbow /></NavLink>
        <NavLink to='/'>RainbowBnb</NavLink>
    </div>
  )
}
