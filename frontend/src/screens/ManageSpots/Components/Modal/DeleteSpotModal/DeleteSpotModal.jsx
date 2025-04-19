import { useModal } from '../../../../../context/Modal';
import { useDispatch } from 'react-redux';

import { deleteSpotThunk } from '../../../../../store/spots';
import './DeleteSpotModal.css'


export default function DeleteSpotModal({
    spot
    
  }) {

    
    
    const dispatch = useDispatch();
    
    
    const {closeModal} = useModal();

    const deleteSpot = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        return await dispatch(deleteSpotThunk(spot)).then(closeModal)
        
       
      }

  return (
    <div className='container'>
      <div className='text'>
        <h1 className='subheading confirm'>Confirm Delete</h1>
        <div className='normal question'>Are you sure you want to remove this spot from the listings?</div>

      </div>
        <div className='buttons'>
        <button  className='big red normal' onClick={(e) => deleteSpot(e)}>Yes</button>
        <button  className='big gray normal' onClick={closeModal}>No</button>

        </div>
    </div>
  )
}
