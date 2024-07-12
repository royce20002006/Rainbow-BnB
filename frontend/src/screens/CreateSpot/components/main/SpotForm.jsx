import { useEffect, useState } from 'react';
import './SpotForm.css'


import { useDispatch } from 'react-redux';
import { addSpotThunk } from '../../../../store/spots';
import { useNavigate } from 'react-router-dom';

export default function SpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('')
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageOne, setImageOne] = useState('')
  const [imageTwo, setImageTwo] = useState('')
  const [imageThree, setImageThree] = useState('')
  const [imageFour, setImageFour] = useState('')
  const [errors, setErrors] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false)





  useEffect(() => {
    const error = {};




    if (!country.trim().length) {
      error.country = 'Country is required';
    }

    if (!address.trim().length) {
      error.address = 'Address is required';
    }

    if (!city.trim().length) {
      error.city = 'City is required';
    }

    if (!state.trim().length) {
      error.state = 'State is required';
    }

    if (!lat.trim().length) {
      error.lat = 'Latitude is required';
    }

    if (!lng.trim().length) {
      error.lng = 'Longitude is required';
    }

    if (description.trim().length < 30) {
      error.description = 'Description needs a minimum of 30 characters';
    }

    if (!name.trim().length) {
      error.name = 'Name is required';
    }

    if (!price.trim().length) {
      error.price = 'Price is required';
    }

    if (!previewImage.trim().length) {
      error.preview = 'Preview Image is required'
    }
    if (previewImage.trim().length) {
      if (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) {
        error.image = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }

    if (imageOne.trim().length) {
      if (!imageOne.endsWith('.png') && !imageOne.endsWith('.jpg') && !imageOne.endsWith('.jpeg')) {
        error.imageOne = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }

    if (imageTwo.trim().length) {
      if (!imageTwo.endsWith('.png') && !imageTwo.endsWith('.jpg') && !imageTwo.endsWith('.jpeg')) {
        error.imageTwo = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }
    if (imageThree.trim().length) {
      if (!imageThree.endsWith('.png') && !imageThree.endsWith('.jpg') && !imageThree.endsWith('.jpeg')) {
        error.imageThree = 'Image URL must end in .png, .jpg, or .jpeg'
      }
    }
    if (imageFour.trim().length) {
      if (!imageFour.endsWith('.png') && !imageFour.endsWith('.jpg') && !imageFour.endsWith('.jpeg')) {
        error.imageFour = 'Image URL must end in .png, .jpg, or .jpeg'
      }

    }
    setErrors(error)

  }, [country, address, state, city, lat, lng, description, name, price, previewImage, imageOne, imageTwo, imageThree, imageFour, buttonClicked])




  const submit = async (e) => {
    setButtonClicked(!buttonClicked)
    e.preventDefault();
    e.stopPropagation();
    const submitErrors = {};
    


      const images = [{ url: previewImage, preview: true },
      { url: imageOne || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      { url: imageTwo || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      { url: imageThree || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      { url: imageFour || 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg', preview: false },
      ]
      const spot = { country, address, state, city, lat, lng, description, name, price }



      const newSpot = await dispatch(addSpotThunk({ spot, images }))
      if (!newSpot.ok) {
        const data = await newSpot.json()
        console.log(data, 'data');
        setErrors(data.errors);
        console.log(errors, 'errors')
        console.log(data.errors, 'data.errors')
        


      }

    


   
    

































  }

  return (
    <div className="form">
      <div className="location">
        <h1 className="heading">Create a new Spot</h1>
        <h2 className="subheading">Where&apos;s your place Located?</h2>
        <p className="normal onlyShows">Guests will only get your exact address once they booked a reservation.</p>

        <div className='sectionOne'>
          <div className='country labelTop'>
            <div className='labelAndError'>
              <label htmlFor="country">Country</label>
              <div className='error'>{buttonClicked && errors.country && errors.country}</div>
            </div>
            <input
              className='longInput colorInput'
              type="text"
              placeholder='Country'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <div className='streetAddress labelTop'>
            <div className='labelAndError'>
              <label htmlFor="street">Street Address</label>
              <div className='error'>{buttonClicked && errors.address && errors.address}</div>
            </div>
            <input
              className='longInput colorInput'
              type="text"
              placeholder='Street Address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className='cityState'>
            <div className='city'>
              <div className='labelAndError'>
                <label className='cityLabel' htmlFor="city">City</label>
                <div className='error'>{buttonClicked && errors.city && errors.city}</div>

              </div>
              <input
                className='cityInput colorInput'
                type="text"
                placeholder='City'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className='normal comma'>,</div>
            <div className='state'>
              <div className='labelAndError'>
                <label className='stateLabel' htmlFor="state">State</label>
                <div className='error'>{buttonClicked && errors.state && errors.state}</div>

              </div>
              <input
                className='stateInput colorInput'
                type="text"
                placeholder='State'
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>
          </div>
          <div className='cityState'>
            <div className='city'>
              <div className='labelAndError'>
                <label className='cityLabel' htmlFor="latitude">Latitude</label>
                <div className='error'>{buttonClicked && errors.lat && errors.lat}</div>

              </div>
              <input
                className='lat colorInput'
                type="text"
                placeholder='Latitude'
                value={lat}
                onChange={e => setLat(e.target.value)}
              />
            </div>
            <div className='normal comma'>,</div>
            <div className='state'>
              <div className='labelAndError'>
                <label className='stateLabel' htmlFor="longitude">Longitude</label>
                <div className='error'>{buttonClicked && errors.lng && errors.lng}</div>

              </div>

              <input
                className='lng colorInput'
                type="text"
                placeholder='Longitude'
                value={lng}
                onChange={e => setLng(e.target.value)}
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
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <div className='error'>{buttonClicked && errors.description && errors.description}</div>
        </div>
        <div className='section2'>
          <h2 className='subheading bottom'>Create a title for your spot</h2>
          <p className='normal onlyShows'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            className='colorInput longInput'
            type="text"
            placeholder='Name of your spot'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className='error'>{buttonClicked && errors.name && errors.name}</div>
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
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className='error'>{buttonClicked && errors.price && errors.price}</div>
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
                value={previewImage}
                onChange={e => setPreviewImage(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.preview && errors.preview || buttonClicked && errors.image && errors.image}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={imageOne}
                onChange={e => setImageOne(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageOne && errors.imageOne}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={imageTwo}
                onChange={e => setImageTwo(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageTwo && errors.imageTwo}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={imageThree}
                onChange={e => setImageThree(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageThree && errors.imageThree}</div>

            </div>
            <div>
              <input
                className='colorInput longInput'
                type="url"

                placeholder='Image URL'
                value={imageFour}
                onChange={e => setImageFour(e.target.value)}
              />
              <div className='error'>{buttonClicked && errors.imageFour && errors.imageFour}</div>
            </div>
          </div>

        </div>

        <div className='buttonDiv'>

          <button
            onClick={(e) => submit(e)}
            disabled={Object.keys(errors).length !== 0}
            className='red'
          >Create Spot</button>
        </div>



      </div>

    </div>
  )
}