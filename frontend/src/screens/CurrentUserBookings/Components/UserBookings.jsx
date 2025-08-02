import '../UserBookings.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import OpenModalButton from '../../../components/Modal/OpenModalButton/OpenModalButton';


import { getCurrentUserBookingsThunk } from "../../../store/bookings";


import UpdateBookingFormModal from './UpdateBookingFormModal/UpdateBookingFormModal';
import DeleteBookingModal from './DeleteReviewModal/DeleteBookingModal';


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

    }, [dispatch, isLoaded, bookings, user])

    const goToSpot = (e, booking) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/spots/${booking.Spot.id}`)
    }

    if (!isLoaded) {
        setTimeout(() => {
            return <h1>Loading</h1>
        }, 1000
        )
    }

    return (
        <div className="bookingContainer">
            {user ?
                <div className='bookingsSection'>
                    {bookings.map((booking, idx) => (

                        <div key={idx} className="card-bookings"  >

                            <div className="flex-container-bookings">

                                <div className="bookings">
                                    <span className="booking-spot-name">{booking.Spot.name}</span>
                                    <img onClick={e => goToSpot(e, booking)} className='bookingImg' src={booking.Spot.previewImage} />
                                    <span className="booking-start-date">Booking Start Date:{` ${booking.startDate}`}</span>
                                    <span className="booking-end-date">{`Booking End Date: ${booking.endDate}`}</span>
                                    <div className='bookingButton'>
                                        <OpenModalButton
                                        buttonText={'Edit'}
                                        modalComponent={<UpdateBookingFormModal spot={booking.Spot} />}
                                        preventDefault
                                        stopPropagation
                                        />
                                        <OpenModalButton
                                        buttonText={'Delete'}
                                        modalComponent={<DeleteBookingModal booking={booking} />}
                                        preventDefault
                                        stopPropagation
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
                : navigate('/')}

        </div>
    )
}
