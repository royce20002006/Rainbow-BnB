import { useEffect, useState } from 'react';
import './UpdateBookingFormModal.css'



import { useDispatch } from 'react-redux';
import { getSpotsThunk } from '../../../../store/spots';

import { updateBookingThunk } from '../../../../store/bookings';



export default function UpdateBookingFormModal({spot}) {
  const dispatch = useDispatch();
  const id = spot.id
  const name = spot.name;
  
  
 
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




    const newBooking = await dispatch(updateBookingThunk(booking, id))



    if (!newBooking.ok && newBooking.ok !== undefined) {
      const data = await newBooking.json();
      setSubmitErrors(data.errors)

    }

  }

  return (
    <div className="form">
      <div>
        <h1 className="heading">{`Edit reservation for ${name}`}</h1>
      
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
            
          >{'Update Booking'}</button>

         
        </div>



      </div>

    </div>
  )
}