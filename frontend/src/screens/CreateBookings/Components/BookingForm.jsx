import { useEffect, useState } from 'react';
import './BookingForm.css'



import { useDispatch, useSelector } from 'react-redux';
import { addSpotThunk, getSpotsThunk, updateSpotThunk } from '../../../store/spots'
import {  useNavigate, useParams } from 'react-router-dom';


export default function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const spot = useSelector(state => state.spotState.byId[id])
  const [value, setValue] = useState(true)
  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({})
  const [buttonClicked, setButtonClicked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [spotForm, setSpotForm] = useState({
    country: '',
    address: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
    description: '',
    name: '',
    price: '',
    previewImage: '',
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    imageFour: '',


  })

  


  const updateForm = (val, key) => {
    return setSpotForm((prev) => {
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
      if (spot) {

        updateForm(spot.country, 'country')
        updateForm(spot.address, 'address')
        updateForm(spot.city, 'city')
        updateForm(spot.state, 'state')
        updateForm(`${spot.lat}`, 'lat')
        updateForm(`${spot.lng}`, 'lng')
        updateForm(spot.description, 'description')
        updateForm(spot.name, 'name')
        updateForm(`${spot.price}`, 'price');
        updateForm(`${spot.previewImage}`, 'previewImage');
        updateForm(`${spot.SpotImages[1].url}`, 'imageOne');
        updateForm(`${spot.SpotImages[2].url}`, 'imageTwo');
        updateForm(`${spot.SpotImages[3].url}`, 'imageThree');
        updateForm(`${spot.SpotImages[4].url}`, 'imageFour')
        

      }
      
      
      
      if (!isLoaded && id) {
        getData();
    }


  }, [dispatch, isLoaded, id, spot ])







  useEffect(() => {
    const error = {};




    if (!spotForm.country.trim().length) {
      error.country = 'Country is required';
    }

    if (!spotForm.address.trim().length) {
      error.address = 'Address is required';
    }

    if (!spotForm.city.trim().length) {
      error.city = 'City is required';
    }

    if (!spotForm.state.trim().length) {
      error.state = 'State is required';
    }

    if (!spotForm.lat.trim().length) {
      error.lat = 'Latitude is required';
    }



    if (!spotForm.lng.trim().length) {
      error.lng = 'Longitude is required';
    }




    if (spotForm.description.trim().length < 30) {
      error.description = 'Description needs a minimum of 30 characters';
    }

    if (!spotForm.name.trim().length) {
      error.name = 'Name is required';
    }

    if (!spotForm.price.trim().length) {
      error.price = 'Price is required';
    }

    if (spotForm.previewImage.trim().length < 3 || spotForm.previewImage.trim().length > 255) {
      error.preview = 'Preview Image is required'
    }
    if (spotForm.previewImage.trim().length > 3 || spotForm.previewImage.trim().length < 255) {
      if (!spotForm.previewImage.endsWith('.png') && !spotForm.previewImage.endsWith('.jpg') && !spotForm.previewImage.endsWith('.jpeg')) {
        error.image = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }
    if (spotForm.imageOne) {

      if (spotForm.imageOne.trim().length > 3 || spotForm.imageOne.trim().length < 255) {
        if (!spotForm.imageOne.endsWith('.png') && !spotForm.imageOne.endsWith('.jpg') && !spotForm.imageOne.endsWith('.jpeg')) {
          error.imageOne = 'Image URL must end in .png, .jpg, or .jpeg'
        }
      }
    }
    if (spotForm.imageTwo) {

      if (spotForm.imageTwo.trim().length > 3 || spotForm.imageTwo.trim().length < 255) {
        if (!spotForm.imageTwo.endsWith('.png') && !spotForm.imageTwo.endsWith('.jpg') && !spotForm.imageTwo.endsWith('.jpeg')) {
          error.imageTwo = 'Image URL must end in .png, .jpg, or .jpeg'
        }
      }
    }
    if (spotForm.imageThree) {

      if (spotForm.imageThree.trim().length > 3 || spotForm.imageThree.trim().length < 255) {
        if (!spotForm.imageThree.endsWith('.png') && !spotForm.imageThree.endsWith('.jpg') && !spotForm.imageThree.endsWith('.jpeg')) {
          error.imageThree = 'Image URL must end in .png, .jpg, or .jpeg'
        }
      }
    }
    if (spotForm.imageFour) {

      if (spotForm.imageFour.trim().length > 3 || spotForm.imageFour.trim().length < 255) {
        if (!spotForm.imageFour.endsWith('.png') && !spotForm.imageFour.endsWith('.jpg') && !spotForm.imageFour.endsWith('.jpeg')) {
          error.imageFour = 'Image URL must end in .png, .jpg, or .jpeg'
        }

      }
    }
   
    setErrors(error)

  }, [spotForm.country, spotForm.address, spotForm.state, spotForm.city, spotForm.lat, spotForm.lng, spotForm.description, spotForm.name, spotForm.price, spotForm.previewImage, spotForm.imageOne, spotForm.imageTwo, spotForm.imageThree, spotForm.imageFour, ])


 



  const submit = async (e) => {
    setButtonClicked(true)
    e.preventDefault();
    e.stopPropagation();



    if (!id) {

    
    const images = [{ url: spotForm.previewImage, preview: true },
    { url: spotForm.imageOne || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageTwo || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageThree || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageFour || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    ]
    const spot = { country: spotForm.country, address: spotForm.address, state: spotForm.state, city: spotForm.city, lat: spotForm.lat, lng: spotForm.lng, description: spotForm.description, name: spotForm.name, price: spotForm.price, previewImage: spotForm.previewImage, imageOne: spotForm.imageOne, imageTwo: spotForm.imageTwo, imageThree: spotForm.imageThree, imageFour: spotForm.imageFour, buttonClicked }




    const newSpot = await dispatch(addSpotThunk(spot, images))



    if (!newSpot.ok && newSpot.ok !== undefined) {
      const data = await newSpot.json();
      setSubmitErrors(data.errors)

    } else {
      const newSpotId = newSpot.spotFormatting.id;
      navigate(`/spots/${newSpotId}`)
    }
  } else {

    const images = [{ url: spotForm.previewImage, preview: true },
    { url: spotForm.imageOne || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageTwo || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageThree || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageFour || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    ]
    const spot = { country: spotForm.country, address: spotForm.address, state: spotForm.state, city: spotForm.city, lat: spotForm.lat, lng: spotForm.lng, description: spotForm.description, name: spotForm.name, price: spotForm.price, previewImage: spotForm.previewImage, imageOne: spotForm.imageOne, imageTwo: spotForm.imageTwo, imageThree: spotForm.imageThree, imageFour: spotForm.imageFour }




    const updatedSpot = await dispatch(updateSpotThunk(spot, images, id))



    if (!updatedSpot.ok && updatedSpot.ok !== undefined) {
      const data = await updatedSpot.json();
      setSubmitErrors(data.errors)

    } else {
      const updatedSpotId = updatedSpot.id;
      navigate(`/spots/${updatedSpotId}`)
    }

  }




  }

  return (
    <div className="form">
      <div className="location">
        <h1 className="heading">Reserve this Spot</h1>
      
        <div className='sectionOne'>
          <div className='country labelTop'>
            <div className='labelAndError'>
              <label htmlFor="country">Start Date</label>
              <div className='error'>{buttonClicked && errors.country && errors.country || buttonClicked && submitErrors.country && submitErrors.country}</div>
            </div>
            <input
              className='longInput colorInput'
              type="text"
              placeholder='Country'
              value={spotForm.country}
              onChange={e => updateForm(e.target.value, 'country')}
            />
          </div>
          <div className='streetAddress labelTop'>
            <div className='labelAndError'>
              <label htmlFor="street">End Date</label>
              <div className='error'>{buttonClicked && errors.address && errors.address || buttonClicked && submitErrors.address && submitErrors.address}</div>
            </div>
            <input
              className='longInput colorInput'
              type="text"
              placeholder='Street Address'
              value={spotForm.address}
              onChange={e => updateForm(e.target.value, 'address')}
            />
          </div>
          
            
           
            
          
          

        </div>
        
        
        
        

        <div className='buttonDiv'>
          
          <button
          
          onFocus={() => setButtonClicked(true)}
            onClick={(e) => submit(e)}
            disabled={value}
            className='red'
            
          >{id ? 'Update your Spot' :'Create Spot'}</button>

         
        </div>



      </div>

    </div>
  )






















}




















