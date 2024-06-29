import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";
import { FaStar } from "react-icons/fa6";
import './Splash.css'


export default function Splash() {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const spots = useSelector(state => state.spotState.allSpots)
  // const [id, setId] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    //grab data
    const getData = async() => {
      dispatch(getSpotsThunk());
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded])

  if(!isLoaded){
    setTimeout(()=> {
    return <h1>Loading</h1>}, 1000
    )
  }

  return (
    <div className='spotSection'>
      {spots.map((spot, idx) => (
       <div key={`${idx}--${spot.id}`} role='tooltip'>
        <img src={spot.previewImage} />
        <div className="locationAndRating">
        <span className="spotLocation spotInfo">{spot.city}, {spot.state} </span>
        <span className="rating"><FaStar className="star" /> {spot.avgRating? spot.avgRating : 'New'
        }</span>
        </div>

        <span className="spotPrice spotInfo">${spot.price}</span><span> night </span>
       </div> 
      ))}
    </div>
  )
}
