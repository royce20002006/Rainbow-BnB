// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navDiv'>
      
      {isLoaded && (
        
        <div>
          <ProfileButton isLoaded={isLoaded} user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;