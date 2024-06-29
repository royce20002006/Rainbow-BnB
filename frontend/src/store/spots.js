import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAllSpots';

// action creator
const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots
})

// thunk
export const getSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            
            await dispatch(getAllSpots(data))
        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}


//reducer
const initialState = {
    allSpots: [],
    byId: {}
};

function spotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state }
            
            newState.allSpots = action.payload.Spots;

            for(let spot of action.payload.Spots) {
                newState.byId[spot.id] = spot;
            }

            return newState;
        default: 
            return state;
    }
}

export default spotsReducer;