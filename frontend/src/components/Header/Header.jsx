import React from 'react'
import Navigation from '../Navigation/Navigation'
import './Header.css'
import Logo from '../Logo/Logo'

export default function Header({ isLoaded }) {
  return (
    
    <div class='header'>
      <Logo />
      <Navigation isLoaded={isLoaded} />
    </div>




  )
}
