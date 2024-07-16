import { useEffect, useState } from 'react';
import './SpotForm.css'



import { useDispatch, useSelector } from 'react-redux';
import { addSpotThunk, getSpotsThunk, updateSpotThunk } from '../../../../store/spots';
import { useNavigate, useParams } from 'react-router-dom';

export default function SpotForm() {
  const { id } = useParams();
  
  const spot = useSelector(state => state.spotState.byId[id])
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const newPrev = { ...prev };
      newPrev[key] = val;
      return newPrev;
    })
  }


  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({})
  const [buttonClicked, setButtonClicked] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);



  


  useEffect(() => {
    const getData = async () => {

      await dispatch(getSpotsThunk());
      // ssetSpotForm({
        //   country: spot.country,
        //   address: spot.address,
        //   city: spot.city,
        //   state: spot.state,
        //   lat: spot.lat,
        //   lng: spot.lng,
        //   description: spot.description,
        //   name: spot.name,
        //   price: spot.price,
        //   previewImage: spot.previewImage,
        //   imageOne: spot.SpotImages[1],
        //   imageTwo: spot.SpotImages[2],
        //   imageThree: spot.SpotImages[3],
        //   imageFour: spot.SpotImages[4]
        // })
        
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

  }, [spotForm.country, spotForm.address, spotForm.state, spotForm.city, spotForm.lat, spotForm.lng, spotForm.description, spotForm.name, spotForm.price, spotForm.previewImage, spotForm.imageOne, spotForm.imageTwo, spotForm.imageThree, spotForm.imageFour, buttonClicked])






  const submit = async (e) => {
    setButtonClicked(!buttonClicked)
    e.preventDefault();
    e.stopPropagation();



    if (!id) {

    
    const images = [{ url: spotForm.previewImage, preview: true },
    { url: spotForm.imageOne || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageTwo || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageThree || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    { url: spotForm.imageFour || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
    ]
    const spot = { country: spotForm.country, address: spotForm.address, state: spotForm.state, city: spotForm.city, lat: spotForm.lat, lng: spotForm.lng, description: spotForm.description, name: spotForm.name, price: spotForm.price, previewImage: spotForm.previewImage, imageOne: spotForm.imageOne, imageTwo: spotForm.imageTwo, imageThree: spotForm.imageThree, imageFour: spotForm.imageFour }




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
        <h1 className="heading">{id ? 'Update your Spot' : 'Create a new Spot'}</h1>
        <h2 className="subheading">Where&apos;s your place Located?</h2>
        <p className="normal onlyShows">Guests will only get your exact address once they booked a reservation.</p>

        <div className='sectionOne'>
          <div className='country labelTop'>
            <div className='labelAndError'>
              <label htmlFor="country">Country</label>
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
              <label htmlFor="street">Street Address</label>
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
          <div className='cityState'>
            <div className='city'>
              <div className='labelAndError'>
                <label className='cityLabel' htmlFor="city">City</label>
                <div className='error'>{buttonClicked && errors.city && errors.city || buttonClicked && submitErrors.city && submitErrors.city}</div>

              </div>
              <input
                className='cityInput colorInput'
                type="text"
                placeholder='City'
                value={spotForm.city}
                onChange={e => updateForm(e.target.value, 'city')}
              />
            </div>
            <div className='normal comma'>,</div>
            <div className='state'>
              <div className='labelAndError'>
                <label className='stateLabel' htmlFor="state">State</label>
                <div className='error'>{buttonClicked && errors.state && errors.state || buttonClicked && submitErrors.state && submitErrors.state}</div>

              </div>
              <input
                className='stateInput colorInput'
                type="text"
                placeholder='State'
                value={spotForm.state}
                onChange={e => updateForm(e.target.value, 'state')}
              />
            </div>
          </div>
          <div className='cityState'>
            <div className='city'>
              <div className='labelAndError'>
                <label className='cityLabel' htmlFor="latitude">Latitude</label>
                <div className='error'>{buttonClicked && errors.lat && errors.lat || buttonClicked && submitErrors.lat && submitErrors.lat}</div>

              </div>
              <input
                className='lat colorInput'
                type="text"
                placeholder='Latitude'
                value={spotForm.lat}
                onChange={e => updateForm(e.target.value, 'lat')}
              />
            </div>
            <div className='normal comma'>,</div>
            <div className='state'>
              <div className='labelAndError'>
                <label className='stateLabel' htmlFor="longitude">Longitude</label>
                <div className='error'>{buttonClicked && errors.lng && errors.lng || buttonClicked && submitErrors.lng && submitErrors.lng}</div>

              </div>

              <input
                className='lng colorInput'
                type="text"
                placeholder='Longitude'
                value={spotForm.lng}
                onChange={e => updateForm(e.target.value, 'lng')}
              />
            </div>
          </div>

        </div>
        <div className='section2 onlyShows'>
          <h2 className='subheading bottom'>Describe your place to guests</h2>
          <p className='normal onlyShows'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            className='colorInput longInput'
            placeholder='Please write at least 30 characters'
            name="description"
            id="description"
            value={spotForm.description}
            onChange={e => updateForm(e.target.value, 'description')}
          ></textarea>
          <div className='error'>{buttonClicked && errors.description && errors.description || buttonClicked && submitErrors.description && submitErrors.description}</div>
        </div>
        <div className='section2'>
          <h2 className='subheading bottom'>Create a title for your spot</h2>
          <p className='normal onlyShows'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            className='colorInput longInput'
            type="text"
            placeholder='Name of your spot'
            value={spotForm.name}
            onChange={e => updateForm(e.target.value, 'name')}
          />
          <div className='error'>{buttonClicked && errors.name && errors.name || buttonClicked && submitErrors.name && submitErrors.name}</div>
        </div>
        <div className='section2'>
          <h2 className='subheading bottom'>Set a base price for your spot</h2>
          <p className='normal onlyShows'>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          <div className='priceInput'>
            <div className='normal'>$</div>
            <input
              className='colorInput longInput'
              type="text"
              placeholder='Price per night (USD)'
              value={spotForm.price}
              onChange={e => updateForm(e.target.value, 'price')}
            />
          </div>
          <div className='error'>{buttonClicked && errors.price && errors.price || buttonClicked && submitErrors.price && submitErrors.price}</div>
        </div>
        <div className='section2'>
          <h2 className='subheading bottom'>Liven up your spot with photos</h2>
          <p className='normal onlyShows'>Submit a link to at least one photo to publish your spot..</p>

          <div className='imageInputs'>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Preview Image URL'
                value={spotForm.previewImage}
                onChange={id ? null : e => updateForm(e.target.value, 'previewImage')}
              />
              <div className='error'>{buttonClicked && errors.preview && errors.preview || buttonClicked && errors.image && errors.image || buttonClicked && submitErrors.preview && submitErrors.preview || buttonClicked && submitErrors.image && submitErrors.image}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={spotForm.imageOne}
                onChange={id ? null : e => updateForm(e.target.value, 'imageOne')}
              />
              <div className='error'>{buttonClicked && errors.imageOne && errors.imageOne || buttonClicked && submitErrors.imageOne && submitErrors.imageOne}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={spotForm.imageTwo}
                onChange={id ? null : e => updateForm(e.target.value, 'imageTwo')}
              />
              <div className='error'>{buttonClicked && errors.imageTwo && errors.imageTwo || buttonClicked && submitErrors.imageTwo && submitErrors.imageTwo}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={spotForm.imageThree}
                onChange={id ? null : e => updateForm(e.target.value, 'imageThree')}
              />
              <div className='error'>{buttonClicked && errors.imageThree && errors.imageThree || buttonClicked && submitErrors.imageThree && submitErrors.imageThree}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={spotForm.imageFour}
                onChange={id ? null : e => updateForm(e.target.value, 'imageFour')}
              />
              <div className='error'>{buttonClicked && errors.imageFour && errors.imageFour || buttonClicked && submitErrors.imageFour && submitErrors.imageFour}</div>
            </div>
          </div>

        </div>

        <div className='buttonDiv'>

          <button
            onClick={(e) => submit(e)}
            disabled={Object.keys(errors).length !== 0}
            className='red'
            id='button'
          >{id ? 'Update your Spot' :'Create Spot'}</button>
        </div>



      </div>

    </div>
  )






















}




















