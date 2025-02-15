import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import './Splash.css'
import { getCurrentUserBookingsThunk } from "../../../store/bookings";


export default function CurrentUserBookings() {
  const navigate= useNavigate();
  const dispatch = useDispatch();
 
  const bookings = useSelector(state => state.bookingsState.currentUser)

  const [isLoaded, setIsLoaded] = useState(false);

  

  useEffect(() => {

    const getData = async () => {
      await dispatch(getCurrentUserBookingsThunk());
      

      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded, bookings])

 

  if (!isLoaded) {
    setTimeout(() => {
      return <h1>Loading</h1>
    }, 1000
    )
  }

  return (
    <div className="grid-container">

    <div className='bookingsSection'>
      {bookings.map((booking, idx) => (
        
        <div className="card"  >
          <span className="tooltip-text">{spot.name}</span>
            <div className="flex-container">
            <img src={spot.previewImage} />
            <div className="locationAndRating">
              <span className="spotLocation spotInfo">{spot.city}, {spot.state} </span>
              <span className="rating"><FaStar className="star" /> {spot.avgStarRating ? spot.avgStarRating.toFixed(1) : 'New'
              }</span>

            </div>

            <span className="spotPrice spotInfo">${spot.price.toFixed(2)}</span><span> night </span>

            </div>
          
        </div>
      ))}
    </div>
    </div>
  )
}
