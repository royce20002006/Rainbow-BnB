
import Navigation from '../Navigation/Navigation'
import './Header.css'
import Logo from '../Logo/Logo'
import SpotButton from '../spotButton/SpotButton'

export default function Header({ isLoaded }) {
  return (
    
    <div className='header'>
      <Logo />
      <div className='rightHeader'>
      <SpotButton />
      <Navigation isLoaded={isLoaded} />
      </div>
    </div>




  )
}
