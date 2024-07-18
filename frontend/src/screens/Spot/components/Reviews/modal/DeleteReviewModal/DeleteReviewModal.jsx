
import { useDispatch } from 'react-redux';


import './DeleteReviewModal.css'
import { deleteReviewThunk } from '../../../../../../store/reviews';
import { useModal } from '../../../../../../context/Modal';
import { getSpotsThunk } from '../../../../../../store/spots';
import { useState } from 'react';


export default function DeleteReviewModal({
    review, setAlreadyReviewed
    
  }) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [ setErrors] = useState('')

    
    
    
    

    const deleteReview = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const res = await dispatch(deleteReviewThunk(review))
        
        
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
        <div className='normal question'>Are you sure you want to delet this review?</div>

      </div>
        <div className='buttons'>
        <button  className='big red normal' onClick={(e) => deleteReview(e)}>Yes (Delete Review)</button>
        <button  className='big gray normal' onClick={closeModal}>No (Keep Review)</button>

        </div>
    </div>
  )
}
