import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import './UserBookings.css'
import { getCurrentUserBookingsThunk } from "../../../store/bookings";


export default function CurrentUserBookings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookingsState.currentUser)

    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {

        const getData = async () => {
            await dispatch(getCurrentUserBookingsThunk(user));


            setIsLoaded(true);
        }

        if (!isLoaded) {
            getData();
        }

    }, [dispatch, isLoaded, bookings])



    if (!isLoaded) {
        setTimeout(() => {
            return <h1>Loading</h1>
        }, 1000
        )
    }

    return (
        <div className="grid-container">
            {session ?
                <div className='bookingsSection'>
                    {bookings.map((booking, idx) => (

                        <div className="card-bookings"  >

                            <div className="flex-container-bookings">

                                <div className="bookings">
                                    <span className="booking-spot-name">{booking.Spot.name}</span>
                                    <span className="booking-start-date">{booking.startDate}</span>
                                    <span className="booking-end-dates">{booking.endDate}</span>
                                    <button className="edit-booking">Edit</button>
                                    <button>Delete</button>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
                : navigate('/')}

        </div>
    )
}
