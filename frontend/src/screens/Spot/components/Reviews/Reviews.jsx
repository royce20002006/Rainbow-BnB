import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { getReviewsThunk } from "../../../../store/reviews";

export default function Reviews() {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviewsState.allReviews)
    const spot = useSelector(state => state.spotState.singleSpot['spot'])
    const sessionUser = useSelector(state => state.session.user);
    const [isOwner, setIsOwner] = useState(false);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false)
    

    useEffect(() => {
        if (spot.ownerId === sessionUser.id) {
            setIsOwner(true);
        }
        for (let review of reviews) {
            if (review.userId === sessionUser.id) {
                console.log("reviewed")
                setAlreadyReviewed(true);
            }
        }
    },[reviews, sessionUser.id, spot.ownerId])
    
    

    useEffect(() => {
        const getData = async () => {
            dispatch(getReviewsThunk(id));
            setIsLoaded(true);
        }


        if (!isLoaded) {
            getData();
        }
    }, [dispatch, id, isLoaded])

    if (!isLoaded || reviews === undefined) {

        return <div>loading</div>


    }

    
    
    return (
        <div>
            <div>
                <div><FaStar className="star" /> {spot.numReviews > 0 ? spot.avgStarRating : 'New'} · {spot.numReviews} reviews</div>
            </div>
            <div><button disabled={isOwner || alreadyReviewed}>Post Your Review</button></div>
            {reviews.length === 0 ? <p>Be the first to post a review!</p> : null}
            <div>
                {reviews.map((review, idx) => (
                    
                    <div key={`${idx}--${review.id}`}>
                        <h2>{review.User.firstName}</h2>
                        <div>{review.updatedAt.slice(5,7)}</div>
                        <div>{review.updatedAt.split('-')[0]}</div>
                        <p>{review.review}</p>
                    </div>


                ))}
            </div>





        </div>
    )
}
