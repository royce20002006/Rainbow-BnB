import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/spot';


// action creator
const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots
})

const getSingleSpot = (spot) => ({
    type: GET_SINGLE_SPOT,
    payload: spot
})



// thunk
export const getSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            
            dispatch(getAllSpots(data))
        } else {
            throw res
        }
        
    } catch (error) {
        return error;
    }
}
export const getSingleSpotThunk = (id) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${id}`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getSingleSpot(data))
            
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
    byId: {},
    singleSpot: {}
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
        case GET_SINGLE_SPOT:
            newState = { ...state }
            newState.singleSpot['spot'] = action.payload;
            

            return newState;
    

        default: 
            return state;
    }
}

export default spotsReducer;