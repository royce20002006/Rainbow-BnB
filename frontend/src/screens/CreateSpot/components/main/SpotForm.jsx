import { useEffect, useState } from 'react';
import './SpotForm.css'



import { useDispatch, useSelector } from 'react-redux';
import { addSpotThunk, getSpotsThunk } from '../../../../store/spots';
import { Form, useNavigate, useParams } from 'react-router-dom';

export default function SpotForm() {
  const { id } = useParams();
  console.log(id);
  const spot = useSelector(state => state.spotState.byId[id])
  console.log(spot)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [spotForm, setSpotForm] = useState({
    country: '',
    address: 'dd',
    city: 'dd',
    state: 'dd',
    lat: 'dd',
    lng: 'dd',
    description: 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    name: 'dd',
    price: 'dd',
    previewImage: 'dd',
    imageOne: 'dd',
    imageTwo: 'dd',
    imageThree: 'dd',
    imageFour: 'dd',


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



  // if (id && spot !== undefined) {
    
  //   setCountry(spot.country);
  //   setAddress(spot.address);
  //   setCity(spot.city)
  //   setState(spot.state)
  //   setLat(`${spot.lat}`)
  //   setLng(`${spot.lng}`)
  //   setDescription(spot.description)
  //   setName(spot.name);
  //   setPrice(`${spot.price}`)
  //   setPreviewImage(spot.previewImage)
  //   setImageOne(spot.SpotImages[1].url)
  //   setImageTwo(spot.SpotImages[2].url)
  //   setImageThree(spot.SpotImages[3].url)
  //   setImageFour(spot.SpotImages[4].url)

  // }


  useEffect(() => {
    const getData = async () => {

      await dispatch(getSpotsThunk());

      setIsLoaded(true);
    }



    if (!isLoaded && id) {
      getData();
    }


  }, [dispatch, isLoaded, id])







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

    if (!spotForm.previewImage.trim().length) {
      error.preview = 'Preview Image is required'
    }
    if (spotForm.previewImage.trim().length) {
      if (!spotForm.previewImage.endsWith('.png') && !spotForm.previewImage.endsWith('.jpg') && !spotForm.previewImage.endsWith('.jpeg')) {
        error.image = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }

    if (spotForm.imageOne.trim().length) {
      if (!spotForm.imageOne.endsWith('.png') && !spotForm.imageOne.endsWith('.jpg') && !spotForm.imageOne.endsWith('.jpeg')) {
        error.imageOne = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }

    if (spotForm.imageTwo.trim().length) {
      if (!spotForm.imageTwo.endsWith('.png') && !spotForm.imageTwo.endsWith('.jpg') && !spotForm.imageTwo.endsWith('.jpeg')) {
        error.imageTwo = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }
    if (spotForm.imageThree.trim().length) {
      if (!spotForm.imageThree.endsWith('.png') && !spotForm.imageThree.endsWith('.jpg') && !spotForm.imageThree.endsWith('.jpeg')) {
        error.imageThree = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }
    if (spotForm.imageFour.trim().length) {
      if (!spotForm.imageFour.endsWith('.png') && !spotForm.imageFour.endsWith('.jpg') && !spotForm.imageFour.endsWith('.jpeg')) {
        error.imageFour = 'Image URL must end in .png, .jpg, or .jpeg'
      }

    }
    setErrors(error)

  }, [spotForm.country, spotForm.address, spotForm.state, spotForm.city, spotForm.lat, spotForm.lng, spotForm.description, spotForm.name, spotForm.price, spotForm.previewImage, spotForm.imageOne, spotForm.imageTwo, spotForm.imageThree, spotForm.imageFour, buttonClicked])






  const submit = async (e) => {
    setButtonClicked(!buttonClicked)
    e.preventDefault();
    e.stopPropagation();


   

      const images = [{ url: previewImage, preview: true },
      { url: imageOne || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      { url: imageTwo || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      { url: imageThree || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      { url: imageFour || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
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
              value={address}
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
                value={city}
                // onChange={e => setCity(e.target.value)}
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
                value={'state'}
                // onChange={e => setState(e.target.value)}
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
                value={'lat'}
                // onChange={e => setLat(e.target.value)}
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
                value={'lng'}
                // onChange={e => setLng(e.target.value)}
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
            value={'description'}
            // onChange={e => setDescription(e.target.value)}
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
            // value={name}
            // onChange={e => setName(e.target.value)}
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
              value={'price'}
              // onChange={e => setPrice(e.target.value)}
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
                value={'previewImage'}
                // onChange={e => setPreviewImage(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.preview && errors.preview || buttonClicked && errors.image && errors.image || buttonClicked && submitErrors.preview && submitErrors.preview || buttonClicked && submitErrors.image && submitErrors.image}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={'imageOne'}
                // onChange={e => setImageOne(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageOne && errors.imageOne || buttonClicked && submitErrors.imageOne && submitErrors.imageOne}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={'imageTwo'}
                // onChange={e => setImageTwo(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageTwo && errors.imageTwo || buttonClicked && submitErrors.imageTwo && submitErrors.imageTwo}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={'imageThree'}
                // onChange={e => setImageThree(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageThree && errors.imageThree || buttonClicked && submitErrors.imageThree && submitErrors.imageThree}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={'imageFour'}
                // onChange={e => setImageFour(e.target.value)}
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
          >Create Spot</button>
        </div>



      </div>

    </div>
  )






















}




















