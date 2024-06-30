import { csrfFetch } from './csrf';

const GET_ALL_REVIEWS = '/reviews';



// action creator
const getReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews
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



//reducer
const initialState = {
    allReviews: [],
    byId: {},
    
};

function ReviewsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = { ...state }
            
            newState.allReviews= action.payload.Reviews;

            for(let review of action.payload.Reviews) {
                newState.byId[review.id] = review;
            }

            return newState;
        

        default: 
            return state;
    }
}

export default ReviewsReducer;