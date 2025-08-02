
import { useDispatch } from 'react-redux';


import './DeleteBookingModal.css'
import { deleteBookingThunk } from '../../../../store/bookings';
import { useModal } from '../../../../context/Modal';

import { useState } from 'react';


export default function DeleteBookingModal({
    booking
    
  }) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [ setErrors] = useState('')

    
    
    
    

    const deleteBooking = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const res = await dispatch(deleteBookingThunk(booking))
        
        
        if (!res.ok ) {
          const data = await res.json();
          setErrors(data.message)

        } else {
          setAlreadyReviewed(false)
          await dispatch(getSpotsThunk())
          closeModal()
        }
        
        
       
      }

  return (
    <div className='container'>
      <div className='text'>
        <h1 className='subheading confirm'>Confirm Delete</h1>
        <div className='normal question'>{`Are you sure you want to delete this Reservation?`}</div>

      </div>
        <div className='buttons'>
        <button  className='big red normal' onClick={(e) => deleteBooking(e)}>Yes</button>
        <button  className='big gray normal' onClick={closeModal}>No</button>

        </div>
    </div>
  )
}
