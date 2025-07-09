import { useEffect, useState } from 'react';
import '../BookingFormModal/BookingFormModal.css'



import { useDispatch } from 'react-redux';
import { getSpotsThunk } from '../../../../../../store/spots';
import { addBookingThunk } from '../../../../../../store/bookings';



export default function BookingFormModal({spot}) {
  const dispatch = useDispatch();
  const id = spot.id
  
  
 
  const [value, setValue] = useState(true)
  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({})
  const [buttonClicked, setButtonClicked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [bookingForm, setBookingForm] = useState({
    startDate: '',
    endDate: ''
  })

  


  const updateForm = (val, key) => {
    return setBookingForm((prev) => {
      setValue(false)
      const newPrev = { ...prev };
      newPrev[key] = val;
      
      return newPrev;
    })
  }





  


  useEffect(() => {
    const getData = async () => {

      await dispatch(getSpotsThunk());
      
        
        setIsLoaded(true);
      }
      // if (booking) {

        
        

      // }
      
      
      
      if (!isLoaded && id) {
        getData();
    }


  }, [dispatch, isLoaded, id, spot ])







  useEffect(() => {
    const error = {};
   
    setErrors(error)

  }, [bookingForm.startDate, bookingForm.endDate ])


 



  const submit = async (e) => {
    setButtonClicked(true)
    e.preventDefault();
    e.stopPropagation();
    


  //   if (!id) {

    
    
    const booking = { startDate: bookingForm.startDate, endDate: bookingForm.endDate}




    const newBooking = await dispatch(addBookingThunk(booking, id))



    if (!newBooking.ok && newBooking.ok !== undefined) {
      const data = await newBooking.json();
      setSubmitErrors(data.errors)

    }
  // } else {

    
  //   const booking = { startDate: bookingForm.startDate, endDate: bookingForm.endDate }




  //   const updatedBooking = await dispatch(updateSpotThunk(booking, id))



  //   if (!updatedBooking.ok && updatedBooking.ok !== undefined) {
  //     const data = await updatedBooking.json();
  //     setSubmitErrors(data.errors)

  //   } else {
  //     const updatedBookingId = updatedBooking.id;
  //     // navigate(`/spots/${updatedSpotId}`)
  //   }

  // }




  }

  return (
    <div className="form">
      <div>
        <h1 className="heading">Reserve this Spot</h1>
      
        <div className='sectionOne'>
          <div className='country labelTop'>
            <div className='labelAndError'>
              <label htmlFor="startDate">Start Date</label>
              <div className='error'>{buttonClicked && errors.startDate && errors.startDate || buttonClicked && submitErrors.startDate && submitErrors.startDate}</div>
            </div>
            <input
              className='longInput colorInput'
              type="date"
              placeholder='startDate'
              value={bookingForm.startDate}
              onChange={e => updateForm(e.target.value, 'startDate')}
            />
          </div>
          <div className='streetAddress labelTop'>
            <div className='labelAndError'>
              <label htmlFor="endDate">End Date</label>
              <div className='error'>{buttonClicked && errors.endDate && errors.endDate || buttonClicked && submitErrors.endDate && submitErrors.endDate}</div>
            </div>
            <input
              className='longInput colorInput'
              type="date"
              placeholder='End Date'
              value={bookingForm.endDate}
              onChange={e => updateForm(e.target.value, 'endDate')}
            />
          </div>
          
            
           
            
          
          

        </div>
        
        
        
        

        <div className='buttonDiv'>
          
          <button
          
          onFocus={() => setButtonClicked(true)}
            onClick={(e) => submit(e)}
            disabled={value}
            className='red center-button'
            
          >{'Create Booking'}</button>

         
        </div>



      </div>

    </div>
  )
}