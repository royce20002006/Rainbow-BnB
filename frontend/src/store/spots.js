import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_USER_SPOTS = 'spots/getUserSpots'
const GET_SINGLE_SPOT = 'spots/spot';
const ADD_SPOT = 'spots/add'
const DELETE_SPOT = 'spots/delete'



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

const deleteSpot = (deletedSpot) => ({
    type: DELETE_SPOT,
    payload: deletedSpot
})









// thunk
export const getSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllSpots(data))
            return data;

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
            return data;


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
            dispatch(getUserSpots(data))
            return data;

        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}

export const addSpotThunk = (spotToAdd, images) => async (dispatch) => {
    try {
        console.log(spotToAdd, 'data at top of thunk')
        console.log(images, 'images thunk');

        const spotAndImages = {
            ...spotToAdd, images: [...images]
        }

        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spotAndImages)
        }
        console.log(options.body, 'options')
        const spot = await csrfFetch('/api/spots', options)


        
        if (spot.ok) {


            const spotData = await spot.json();




            await dispatch(addSpot(spotData.spotFormatting));

            return spotData;
        }






    } catch (error) {
        console.log(error, 'thunk error');

        return error;
    }
}

export const deleteSpotThunk = (spot) => async (dispatch) => {
    try {
        

        const options = {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        }
        

        const deletedSpot = await csrfFetch(`/api/spots/${spot.id}`, options)

        
        
        if (deletedSpot.ok) {
            

            const spotData = await deletedSpot.json();

            console.log(spotData, 'deleted data')
            await dispatch(deleteSpot(spotData));

            return spotData;
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

            for (let spot of action.payload.Spots) {
                newState.byId[spot.id] = spot;
            }

            return newState;
        case GET_SINGLE_SPOT:
            newState = { ...state }

            newState.singleSpot = action.payload;


            return newState;

        case GET_USER_SPOTS:
            newState = { ...state };
            newState.currentUser = action.payload.Spots;
            return newState;

        case ADD_SPOT:
            newState = { ...state }
            newState.addSpot = action.payload;
            return newState;

        case DELETE_SPOT:
            newState = { ...state }

            const filteredSpots = newState.allSpots.filter(spot => {
                console.log(action.payload.id, 'payload id in all')
                return spot.id !== action.payload.id
            })
            newState.allSpots = filteredSpots
            
            const newById = { ...newState.byId };
            delete newById[action.payload.id];
            newState.byId = newById;
            
            const filteredUserSpots = newState.currentUser.filter(spot => {
                console.log(action.payload.id, 'new payload id in user')
                return spot.id !== action.payload.id
            })
            newState.currentUser = filteredUserSpots;
            return newState



        default:
            return state;
    }
}

export default spotsReducer;