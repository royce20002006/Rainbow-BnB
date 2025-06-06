import { useModal } from "../../../../../context/Modal";
export default function OpenModalButton({
    modalComponent,
    buttonText,
    onButtonClick,
    onModalClose
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if(typeof onButtonClick === 'function') onButtonClick();
    };
  return (
    <button  className='red manage-button' onClick={onClick}>{buttonText}</button>
  )
}
