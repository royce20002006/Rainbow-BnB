import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

import { FaStar } from "react-icons/fa";
import { getReviewsThunk } from "../../../../store/reviews";

import './Spot.css'
import Reviews from '../Reviews/Reviews';
import { getSpotsThunk } from "../../../../store/spots";


export default function Spot() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const spot = useSelector(state => state.spotState.byId[id])

  


  
  

  useEffect(() => {
    const getData = async () => {
     
      await dispatch(getSpotsThunk());
      await dispatch(getReviewsThunk(id));
      setIsLoaded(true);
    }

    if (!isLoaded || spot === undefined) {
      getData();
    }
  }, [dispatch, id, isLoaded, spot])

  if (!isLoaded || spot === undefined) {

    return <div>loading</div>

  }

  const reserveSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Feature coming soon')
  }




  return (
    // <h1>yea idk</h1>
    <div className="spotDetails">
      <h1 className="heading">{spot.name}</h1>
      <div className="subheading">{spot.city}, {spot.state}, {spot.country}</div>
      <div className="images">
        <div className="firstImage">
        <img   src={isLoaded && spot.SpotImages[0] ? spot.SpotImages[0].url : null} />
        </div>
       

        <div className="smallImageDivRow1">
        <img   src={isLoaded && spot.SpotImages[1] ? spot.SpotImages[1].url : null} />
        <img   src={isLoaded && spot.SpotImages[2]  ? spot.SpotImages[2].url : null} />
        </div>

        <div className="smallImageDivRow2">
          
        <img className="top"  src={isLoaded && spot.SpotImages[3] ? spot.SpotImages[3].url : null} />
        <img  className="bottom" src={isLoaded && spot.SpotImages[4] ? spot.SpotImages[4].url : null} />
        </div>
       

        

      </div>
      <div className="ownerAndPriceDiv">
        <div className="description-div">
          <div className="subheading">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
          <div className="normal">{spot.description}</div>
        </div>
        <div className="reservationDiv">
          <div className="priceAndReview">
          <div>${spot.price.toFixed(2)} night</div>
          <div><FaStar className="star" /> {spot.numReviews > 0 ? spot.avgStarRating.toFixed(1) : 'New'}  {spot.numReviews === 0 ? null : spot.numReviews === 1 ?' · ' + spot.numReviews + ' Review' : ' · ' + spot.numReviews + ' Reviews' } </div>
          </div>

          <button id="button" className="red reserve" onClick={(e) => reserveSubmit(e)}>Reserve</button>
        </div>
        <div>
        </div>
      </div>
      <Reviews spot={spot}/>


    </div>
  )
}
