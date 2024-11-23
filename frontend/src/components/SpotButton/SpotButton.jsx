
import { useSelector } from 'react-redux';

export default function SpotButton() {
    const sessionUser = useSelector(state => state.session.user);
  return (
    <>
    {sessionUser ? (<div>
        Create a New Spot
    </div>) : null}
    </>
  )
}
