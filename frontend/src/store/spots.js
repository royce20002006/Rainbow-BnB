import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_USER_SPOTS = 'spots/current'
const GET_SINGLE_SPOT = 'spots/spot';
const ADD_SPOT = 'spots/add'
const ADD_IMAGE = 'spots/images/add'


// action creator
const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots
})
const getUserSpots = (spots) => ({
    type: GET_USER_SPOTS,
    payload: spots
})

const getSingleSpot = (spot) => ({
    type: GET_SINGLE_SPOT,
    payload: spot
})

const addSpot = (spot) => ({
    type: ADD_SPOT,
    payload: spot
})

const addImage = (spotId, image) => ({
    type: ADD_IMAGE,
    payload: image,
    spotId

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
export const getCurrentUserSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/current`);
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            dispatch(getSingleSpot(data))
            
            
        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}

export const addSpotThunk = (spot) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        }
        const res = await csrfFetch('/api/spots/', options )
        if (res.ok) {
            const data = await res.json();
            dispatch(getSingleSpot(data))
            return data;
            
        } else {
            
            throw res
        }
        
    } catch (error) {
        return error;
    }
}

export const addImageThunk = (id, image) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(image)
        }
        const res = await csrfFetch(`/api/spots/${id}/images`, options)
        console.log(res)
        if (res.ok) {
            const data = await res.json();
            dispatch(addImage(id, data))
            return data

        } else {
            throw res
        }
        
    } catch (error) {
        return error
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

            newState.singleSpot = action.payload;
            

            return newState;
        
           

            case ADD_IMAGE:
                newState = { ...state };
                newState.singleSpot.SpotImages = [...newState?.singleSpot?.SpotImages || []]
                newState.singleSpot.SpotImages.push(action.image)
                return newState

            case GET_USER_SPOTS:
                newState = { ...state };
                newState.currentUser = action.payload.spots;
                for(let spot of action.payload.Spots) {
                    newState.byId[spot.id] = spot;
                }

                return newState;


        default: 
            return state;
    }
}

export default spotsReducer;