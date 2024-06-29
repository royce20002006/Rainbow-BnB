
import { useSelector } from 'react-redux';

export default function SpotButton() {
    const sessionUser = useSelector(state => state.session.user);
  return (
    <>
    {sessionUser ? (<div className='createSpotLink'>
        Create a New Spot
    </div>) : null}
    </>
  )
}
