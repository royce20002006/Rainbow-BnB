import { csrfFetch } from './csrf';

const GET_ALL_REVIEWS = '/reviews';
const CREATE_REVIEW = '/review/new'



// action creator
const getReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
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
export const createReviewThunk = (id, review) => async (dispatch) => {

    try {
        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        }
        const res = await csrfFetch(`/api/spots/${id}/reviews`, options)
        console.log(res.ok)
        if (res.ok) {
            
            
            const reviewData = await res.json();
            
            console.log(reviewData, 'review in thunk')
            


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
        case GET_ALL_REVIEWS:{
            newState = { ...state }
            
            newState.allReviews= action.payload.Reviews.reverse();

            for(let review of action.payload.Reviews) {
                newState.byId[review.id] = review;
            }

            return newState;
        }
        case CREATE_REVIEW: {
            newState = { ...state }
            newState.allReviews = [action.payload, ...newState.allReviews]
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }
        

        default: 
            return state;
    }
}

export default ReviewsReducer;