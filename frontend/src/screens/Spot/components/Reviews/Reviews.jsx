import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import {  getReviewsThunk } from "../../../../store/reviews";
import OpenModalButton from "./modal/CreateReviewModal/OpenModalButton.jsx";
import CreateReviewModal from "./modal/CreateReviewModal/CreateReviewModal.jsx";
import '../Spot/Spot.css'
import './Reviews.css'
import DeleteReviewModal from "./modal/DeleteReviewModal/DeleteReviewModal.jsx";


export default function Reviews({ spot }) {
    const { id } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviewsState.allReviews)

    const sessionUser = useSelector(state => state.session.user);
    const [isOwner, setIsOwner] = useState(false);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false)



    useEffect(() => {
        const getData = async () => {
            dispatch(getReviewsThunk(id));
            setIsLoaded(true);
        }


        if (!isLoaded) {
            getData();
        }
    }, [dispatch, id, isLoaded])

    useEffect(() => {
        if (sessionUser) {

            if (spot.ownerId === sessionUser.id) {
                setIsOwner(true);

            } else {
                setIsOwner(false);
            }
            for (let review of reviews) {
                if (review.userId === sessionUser.id) {
                    setAlreadyReviewed(true);
                    
                }
            }
        }
    }, [spot, reviews, sessionUser, alreadyReviewed, isOwner])


    


    if (!isLoaded || reviews === undefined) {

        return <div>loading</div>


    }

    const getMonth = (date) => {
        const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return month[date]
    }






    return (

        <div className="reviewsStart">
            <div className="ratingsWithButton">
                <div className="subheading">
                    <div><FaStar className="star" /> {spot.numReviews > 0 ? spot.avgStarRating.toFixed(1) : 'New'} {spot.numReviews === 0 ? null : spot.numReviews === 1 ? ' · ' + spot.numReviews + ' Review' : ' · ' + spot.numReviews + ' Reviews'}</div>
                </div>
                {
                    !sessionUser || isOwner || alreadyReviewed ? null : <div className="postDiv"><OpenModalButton
                        id=''
                        className=''
                        buttonText="Post A Review"
                        modalComponent={<CreateReviewModal id={id} />}
                        preventDefault
                        stopPropagation
                    /></div>
                }
                {!sessionUser || isOwner || alreadyReviewed ? null : reviews.length === 0 && sessionUser ? <p className="normal first-to-post">Be the first to post a review!</p> : null}

            </div>

            <div>
                {reviews.map((review, idx) => (

                    <div className='review' key={`${idx}--${review.id}`}>
                        <h3 className="reviewUser normal">{review.User.firstName}</h3>
                        <div className="date normal">
                            <div>{(getMonth(new Date(review.updatedAt).getMonth())
                            )

                            }</div>
                            <div>{review.updatedAt.split('-')[0]}</div>

                        </div>
                        <p className="normal reviewText">{review.review}</p>
                        <div className="delete-review">
                            {sessionUser && review.userId === sessionUser.id ?
                                <OpenModalButton
                                    className='red manage-button delete-review-button'
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal setAlreadyReviewed={setAlreadyReviewed} review={review} />}
                                    preventDefault
                                    stopPropagation
                                /> : null}

                        </div>
                    </div>


                ))}
            </div>





        </div>
    )
}
