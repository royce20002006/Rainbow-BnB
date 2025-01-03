import { csrfFetch } from './csrf';

const GET_ALL_BOOKINGS = 'bookings/getAllBookings';
// const GET_USER_SPOTS = 'spots/getUserSpots';

const ADD_BOOKING = 'bookings/add';
// const DELETE_SPOT = 'spots/delete';
// const UPDATE_SPOT = 'spots/update';



// action creator
const getAllBBookings = (bookings) => ({
    type: GET_ALL_BOOKINGS,
    payload: bookings
})
// const getUserSpots = (spots) => ({
//     type: GET_USER_SPOTS,
//     payload: spots
// })



const addBooking = (booking) => ({
    type: ADD_BOOKING,
    payload: booking
})

// const deleteSpot = (deletedSpot) => ({
//     type: DELETE_SPOT,
//     payload: deletedSpot
// })

// const updateSpot = (updatedSpot) => ({
//     type: UPDATE_SPOT,
//     payload: updatedSpot
// })









// thunk
export const getBookingsThunk = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllBookings(data))
            return data;

        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}

// export const getCurrentUserSpotsThunk = () => async (dispatch) => {
//     try {
//         const res = await csrfFetch(`/api/spots/current`);
//         if (res.ok) {
//             const data = await res.json();
//             dispatch(getUserSpots(data))
//             return data;

//         } else {
//             throw res
//         }

//     } catch (error) {
//         return error;
//     }
// }

export const addBookingThunk = (booking, id) => async (dispatch) => {
    try {

        

        const options = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        }
        const newBooking = await csrfFetch(`/api/spots/${id}/bookings`, options)



        if (newBooking.ok) {
            const bookingData = await spot.json();
            await dispatch(addBooking(bookingData));
            return bookingData;
        }

    } catch (error) {
        return error;
    }
}

// export const updateSpotThunk = (spotToAdd, images, id) => async (dispatch) => {
//     try {
//         const spotAndImages = {
//             ...spotToAdd, images: [...images]
//         }

//         const options = {
//             method: 'PUT',
//             header: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(spotAndImages)
//         }


//         const spot = await csrfFetch(`/api/spots/${id}`, options)
//         if (spot.ok) {
//             const spotData = await spot.json();
//             await dispatch(updateSpot(spotData));
//             return spotData;
//         }
//     } catch (error) {
//         return error;
//     }
// }

// export const deleteSpotThunk = (spot) => async (dispatch) => {
//     try {
//         const options = {
//             method: 'DELETE',
//             header: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(spot)
//         }
//         const deletedSpot = await csrfFetch(`/api/spots/${spot.id}`, options)
//         if (deletedSpot.ok) {
//             const spotData = await deletedSpot.json();
//             await dispatch(deleteSpot(spotData));
//             return spotData;
//         }

//     } catch (error) {
//         return error;
//     }
// }



//reducer
const initialState = {
    allBookings: [],
    byId: {},
    
};

function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_BOOKINGS: {
            newState = { ...state }
            newState.allBookings = action.payload.Bookings;

            for (let booking of action.payload.Bookings) {
                newState.byId[booking.id] = booking;
            }

            return newState;
        }

        // case GET_USER_SPOTS: {
        //     newState = { ...state };
        //     newState.currentUser = action.payload.Spots;
        //     return newState;
        // }
        case ADD_BOOKING: {
            newState = { ...state }
            newState.allBookings = [ ...newState.allBookings, action.payload]
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }

        // case DELETE_SPOT: {
        //     newState = { ...state }
        //     const filteredSpots = newState.allSpots.filter(spot => {
        //         return spot.id !== action.payload.id
        //     })
            
        //     newState.allSpots = filteredSpots

        //     const newById = { ...newState.byId };
        //     delete newById[action.payload.id];
        //     newState.byId = newById;

        //     const filteredUserSpots = newState.currentUser.filter(spot => {
                
        //         return spot.id !== action.payload.id
        //     })
        //     newState.currentUser = filteredUserSpots;
        //     return newState
        // }
        // case UPDATE_SPOT: {
        //     newState = { ...state }
            
        //     const spotId = action.payload.id;

        //     const newAllSpots = [];
        //     for (let i = 0; i < newState.allSpots.length; i++) {
        //         let currSpot = newState.allSpots[i];
        //         if (currSpot.id === spotId) {
        //             newAllSpots.push(action.payload);
        //         } else {
        //             newAllSpots.push(currSpot)
        //         }
        //     }

        //     newState.allSpots = newAllSpots;
        //     newState.byId = { ...newState.byId, [spotId]: action.payload };
        //     return newState;
        // }


        default:
            return state;
    }
}

export default bookingsReducer;