import { csrfFetch } from './csrf';


const GET_ALL_REVIEWS = 'reviews/getReviews';
const CURRENT_USER_REVIEWS = 'reviews/current';
const CREATE_REVIEW = 'reviews/new';
const DELETE_REVIEW = 'reviews/delete';



// action creator
const getReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews
})

const getCurrentUserReviews = (reviews) => ({
    type: CURRENT_USER_REVIEWS,
    payload: reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    payload: review
})






// thunk
export const getReviewsThunk = (id) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${id}/reviews`);
        if (res.ok) {
            const data = await res.json();
            await dispatch(getReviews(data))
            
        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}
export const getCurrentUserReviewsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/reviews/current`);
        if (res.ok) {
            const data = await res.json();
            await dispatch(getCurrentUserReviews(data))
            
        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}
export const deleteReviewThunk = (review) => async (dispatch) => {
    try {
       
        const options = {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        };

        const res = await csrfFetch(`/api/reviews/${review.id}`, options);
        if (res.ok) {
            const data = await res.json();
            await dispatch(deleteReview(data))
            return res;
        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}
export const createReviewThunk = (id, review) => async (dispatch) => {

    try {
        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        }
        const res = await csrfFetch(`/api/spots/${id}/reviews`, options)
     
        if (res.ok) {
            const reviewData = await res.json();
            await dispatch(createReview(reviewData));
            return reviewData;
        }

    } catch (error) {
        return error
    }
}



//reducer
const initialState = {
    allReviews: [],
    byId: {},

};

function ReviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            newState = { ...state }
            
            newState.allReviews = action.payload.Reviews;

            for (let review of action.payload.Reviews) {
                newState.byId[review.id] = review;
            }

            return newState;
        }
        case CURRENT_USER_REVIEWS: {
            newState = { ...state };
            newState.currentUser = action.payload.Reviews;
            return newState;
        }
        case CREATE_REVIEW: {
            newState = { ...state }
            newState.allReviews = [action.payload, ...newState.allReviews]
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }
        case DELETE_REVIEW: {
            newState = { ...state }
            
            

            const filteredReviews = newState.allReviews.filter((review) => {
                return review.id !== action.payload.id
            })
            
            newState.allReviews = filteredReviews


            const newById = { ...newState.byId };
            delete newById[action.payload.id];
            newState.byId = newById;



            return newState;

        }




        default:
                return state;
    }
}

export default ReviewsReducer;