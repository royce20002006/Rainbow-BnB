
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function SpotButton() {
    const sessionUser = useSelector(state => state.session.user);
  return (
    <>
    {sessionUser ? (<div className='createSpotLink'>
        <NavLink to={'/spots/new'} >Create New Spot</NavLink>
    </div>) : null}
    </>
  )
}
