import { useModal } from '../../../../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../../../../../components/Modal/OpenModalButton/OpenModalButton';
import { deleteSpotThunk } from '../../../../../store/spots';
import './DeleteSpotModal.css'


export default function DeleteSpotModal({
    spot
    
  }) {

    
    
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotState.currentUser)
    const {setModalContent, setOnModalClose } = useModal();
    const {closeModal} = useModal();

    const deleteSpot = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        return await dispatch(deleteSpotThunk(spot)).then(closeModal)
        
        // if (onModalClose) setOnModalClose(onModalClose);
        // setModalContent(modalComponent)
        // if(typeof onItemClick === 'function') onItemClick();
        // console.log('clickedd')
        // setDeleteS(!deleteS)
      }

  return (
    <div className='container'>
      <div className='text'>
        <h1 className='subheading confirm'>Confirm Delete</h1>
        <div className='normal question'>Are you sure you want to remove this spot from the listings?</div>

      </div>
        <div className='buttons'>
        <button className='big red normal' onClick={(e) => deleteSpot(e)}>Yes (Delete Spot)</button>
        <button className='big gray normal' onClick={closeModal}>No (Keep Spot)</button>

        </div>
    </div>
  )
}
