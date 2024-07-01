import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpotThunk } from "../../../../store/spots";
import { FaStar } from "react-icons/fa";
import { getReviewsThunk } from "../../../../store/reviews";
import Reviews from "../reviews/reviews";


export default function Spot() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spotState.singleSpot['spot'])
  // console.log(spot);

  useEffect(() => {
    const getData = async () => {
      dispatch(getSingleSpotThunk(id));
      dispatch(getReviewsThunk(id));
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }
  }, [dispatch, id, isLoaded])

  if (!isLoaded || spot === undefined) {

    return <div>loading</div>

  }




  return (
    // <h1>yea idk</h1>
    <div>
      <h1>{spot.name}</h1>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div>
        <img className="firstImage" src={isLoaded ? spot.SpotImages[0].url : null} />
        <div>
          {spot.SpotImages.filter((image) => image.id !== spot.SpotImages[0].id).map((image, idx) => (
            <img key={`${idx}--${image.id}`} src={image.url} />
          ))}
        </div>

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
          <button>work in progress</button>
        </div>
      </div>
      <Reviews />


    </div>
  )
}
