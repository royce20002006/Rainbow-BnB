import { useModal } from '../../../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../../../../components/Modal/OpenModalButton/OpenModalButton';


export default function DeleteSpotModal({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    
    
  }) {
    
    
    const dispatch = useDispatch();
    const {setModalContent, setOnModalClose } = useModal();

    const deleteSpot = (e, spot) => {
        e.preventDefault();
        e.stopPropagation();
        
        // if (onModalClose) setOnModalClose(onModalClose);
        // setModalContent(modalComponent)
        // if(typeof onItemClick === 'function') onItemClick();
        // console.log('clicked')
        // setDeleteS(!deleteS)
      }

  return (
    <div>
        <h1>Confirm Delete</h1>
        <div>Are you sure you want to remove this spot from the listings?</div>
        <button>Yes (Delete Spot)</button>
        <button>No (Keep Spot)</button>
    </div>
  )
}
