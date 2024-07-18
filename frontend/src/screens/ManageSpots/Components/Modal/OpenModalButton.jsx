import { useModal } from "../../../../context/Modal"

export default function OpenModalButton({
    modalComponenet,
    buttonText,
    onButtonClick,
    onModalClose
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponenet);
        if(typeof onButtonClick === 'function') onButtonClick();
    };
  return (
    <button  className='red manage-button' onClick={onClick}>{buttonText}</button>
  )
}
