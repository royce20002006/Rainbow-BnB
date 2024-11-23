import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";
import { FaStar } from "react-icons/fa6";
import './Splash.css'


export default function Splash() {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spotState.allSpots)
  

  const [isLoaded, setIsLoaded] = useState(false);

  

  useEffect(() => {

    const getData = async () => {
      await dispatch(getSpotsThunk());
      

      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded])

  const goToSpot = (e,spot) => {
    
    e.preventDefault();
    e.stopPropagation();
    navigate(`/spots/${spot.id}`)
  }

  if (!isLoaded) {
    setTimeout(() => {
      return <h1>Loading</h1>
    }, 1000
    )
  }

  return (
    <div className="grid-container">

    <div className='spotSection'>
      {spots.map((spot, idx) => (
        
        <div className="card" onClick={e => goToSpot(e,spot)}key={`${idx}--${spot.id}`} >
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
