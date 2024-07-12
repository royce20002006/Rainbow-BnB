import { csrfFetch } from './csrf';

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_USER_SPOTS = 'spots/getUserSpots'
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

const addSpot = (data) => ({
    type: ADD_SPOT,
    payload: data
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

export const addSpotThunk = (data) => async (dispatch) => {
    try {
        console.log(data, 'data at top of thunk')
        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const spot = await csrfFetch('/api/spots', options)
        if (spot.ok) {


            const spotData = await spot.json();
            console.log(spotData, 'spotData')
            const imageData = [];




            for (let image of data.images) {
                const options = {
                    method: 'POST',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(image)
                }



                const res = await csrfFetch(`/api/spots/${spotData.id}/images`, options)

                if (res.ok) {
                    imageData.push(await res.json())





                } else {
                    throw res;
                }

            }
            console.log(imageData)
            const result = { images: imageData, spot: spotData }
            console.log(result, 'result');
            await dispatch(addSpot(result));
            return result;
        } else {
            console.log(res, 'res in thunk');


            throw spot;
        }





    } catch (error) {
        console.log(error, 'thunk error');
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




        default:
            return state;
    }
}

export default spotsReducer;