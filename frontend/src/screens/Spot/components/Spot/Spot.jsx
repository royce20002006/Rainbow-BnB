import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { getSpotThunk } from "../../../../store/spots";
import { FaStar } from "react-icons/fa";
import { getReviewsThunk } from "../../../../store/reviews";

export default function Spot() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spotState.singleSpot)
  const reviews = useSelector(state => state.reviewsState.allReviews)
  
  console.log(reviews)

  useEffect(() => {
    const getData = async () => {
      dispatch(getSpotThunk(id));
      dispatch(getReviewsThunk(id));
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }
  }, [dispatch, id, isLoaded])

  if (!spot) {
    
      return <div></div>;
    
  }

  if (!isLoaded) {
    setTimeout(() => {
      return <h1>Loading</h1>
    }, 1000
    )
  }


  return (
    <div>
      <h1>{spot.name}</h1>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div>
        <img className="firstImage" src={isLoaded ? spot.SpotImages[0].url : null} />
        {isLoaded ? spot.SpotImages.filter((image) => image.id !== spot.SpotImages[0].id).map((image, idx) => (
          <img key={`${idx}--${image.id}`} src={image.url} />
        )) : null}
      </div>
      <div>
        <div>
          <div>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
          <div>{spot.description}</div>
        </div>
        <div>
          <div>${spot.price} night</div>
          <div><FaStar className="star" /> {spot.numReviews > 0 ? spot.avgStarRating : 'New'} · {spot.numReviews} reviews</div>
        </div>
        <div>
        <div><FaStar className="star" /> {spot.numReviews > 0 ? spot.avgStarRating : 'New'} · {spot.numReviews} reviews</div>
        </div>
        <div>
          <button>work in progress</button>
        </div>
        </div>

      
    </div>
  )
}
