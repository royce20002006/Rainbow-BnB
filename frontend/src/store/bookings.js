import { csrfFetch } from './csrf';

const GET_ALL_BOOKINGS = 'bookings/getAllBookings';
const GET_USER_BOOKINGS = 'bookings/getUserBookings';

const ADD_BOOKING = 'bookings/add';
const DELETE_BOOKING = 'bookings/delete';
const UPDATE_BOOKING = 'bookings/update';



// action creator
const getAllBookings = (bookings) => ({
    type: GET_ALL_BOOKINGS,
    payload: bookings
})
const getUserBookings = (bookings) => ({
    type: GET_USER_BOOKINGS,
    payload: bookings
})



const addBooking = (booking) => ({
    type: ADD_BOOKING,
    payload: booking
})

const deleteBooking = (deletedBooking) => ({
    type: DELETE_BOOKING,
    payload: deletedBooking
})

const updateBooking = (updatedBooking) => ({
    type: UPDATE_BOOKING,
    payload: updatedBooking
})









// thunk
export const getBookingsThunk = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
        console.log(res, 'res in thunk')
        if (res.ok) {
            const data = await res.json();
            console.log(data, 'data in thunk')
            dispatch(getAllBookings(data))
            return data;

        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}

export const getCurrentUserBookingsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/bbookings/current`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getUserBookinga(data))
            return data;

        } else {
            throw res
        }

    } catch (error) {
        return error;
    }
}

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

export const updateBookingThunk = (booking, id) => async (dispatch) => {
    try {
       

        const options = {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        }


        const booking = await csrfFetch(`/api/bookings/${id}`, options)
        if (booking.ok) {
            const bookingData = await booking.json();
            await dispatch(updateBooking(bookingData));
            return bookingData;
        }
    } catch (error) {
        return error;
    }
}

export const deleteBookingThunk = (booking) => async (dispatch) => {
    try {
        const options = {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        }
        const deletedBooking = await csrfFetch(`/api/bookings/${booking.id}`, options)
        if (deletedBooking.ok) {
            const bookingData = await deletedBooking.json();
            await dispatch(deleteBooking(bookingData));
            return bookingData;
        }

    } catch (error) {
        return error;
    }
}



//reducer
const initialState = {
    allBookings: [],
    currentUser:[],
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

        case GET_USER_BOOKINGS: {
            newState = { ...state };
            newState.currentUser = action.payload.Bookings;
            return newState;
        }
        case ADD_BOOKING: {
            newState = { ...state }
            newState.allBookings = [ ...newState.allBookings, action.payload]
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }

        case DELETE_BOOKING: {
            newState = { ...state }
            const filteredBookings = newState.allBookings.filter(bookings => {
                return bookings.id !== action.payload.id
            })
            
            newState.allBookings = filteredBookings

            const newById = { ...newState.byId };
            delete newById[action.payload.id];
            newState.byId = newById;

            const filteredUserBookings = newState.currentUser.filter(booking => {
                
                return booking.id !== action.payload.id
            })
            newState.currentUser = filteredUserBookings;
            return newState
        }
        case UPDATE_SPOT: {
            newState = { ...state }
            
            const bookingId = action.payload.id;

            const newAllBookings = [];
            for (let i = 0; i < newState.allBookings.length; i++) {
                let currBooking = newState.allBookings[i];
                if (currBooking.id === bookingId) {
                    newAllBookings.push(action.payload);
                } else {
                    newAllBookings.push(currBooking)
                }
            }

            newState.allBookings = newAllBookings;
            newState.byId = { ...newState.byId, [bookingId]: action.payload };
            return newState;
        }

       

        default:
            return state;
    }
}

export default bookingsReducer;