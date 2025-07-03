import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


import { getCurrentUserReviewsThunk } from "../../../store/reviews";


export default function ManageReviews() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviewsState.currentUser)

    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {

        const getData = async () => {
            await dispatch(getCurrentUserReviewsThunk());


            setIsLoaded(true);
        }

        if (!isLoaded) {
            getData();
        }

    }, [dispatch, isLoaded, user])



    if (!isLoaded) {
        setTimeout(() => {
            return <h1>Loading</h1>
        }, 1000
        )
    }

    return (
        <div className="grid-container">
            {user ?
                <div className='reviews-section'>
                    {reviews.map((review, idx) => (

                        <div key={idx} className="card-reviews"  >

                            <div  className="flex-container-reviews">

                                <div className="reviews">
                                    
                                    <button className="edit-booking">Edit</button>
                                    <button className="red">Delete</button>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
                : navigate('/')}

        </div>
    )
}
