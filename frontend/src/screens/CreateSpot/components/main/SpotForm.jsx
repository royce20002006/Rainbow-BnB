import { useState } from 'react';
import './SpotForm.css'
import { useDispatch } from 'react-redux';

export default function SpotForm() {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
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

  const dispatch = useDispatch();



  const submit = (e) => {
    e.preventDefault();
    e.stopPropagation();

  }

  return (
    <div className="form">
      <div className="location">
        <h1 className="heading">Create a new Spot</h1>
        <h2 className="subheading">Where&apos;s your place Located?</h2>
        <p className="normal onlyShows">Guests will only get your exact address once they booked a reservation.</p>

        <div className='sectionOne'>
          <div className='country labelTop'>
            <label htmlFor="country">Country</label>
            <input
              className='longInput colorInput'
              type="text"
              placeholder='Country'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <div className='streetAddress labelTop'><label htmlFor="street">Street Address</label>
            <input
              className='longInput colorInput'
              type="text"
              placeholder='Street Address'
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </div>
          <div className='cityState'>
            <div className='city'>

              <label className='cityLabel' htmlFor="city">City</label>
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

              <label className='stateLabel' htmlFor="state">State</label>
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

              <label className='cityLabel' htmlFor="city">Latitude</label>
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

              <label className='stateLabel' htmlFor="state">Longitude</label>
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
        </div>
        <div className='section2'>
          <h2 className='subheading bottom'>Set a base price for your spot</h2>
          <p className='normal onlyShows'>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          <div className='priceInput'>
            <div className='normal'>$</div>
            <input
              className='colorInput longInput'
              type="text"
              placeholder='Name of your spot'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className='section2'>
          <h2 className='subheading bottom'>Liven up your spot with photos</h2>
          <p className='normal onlyShows'>Submit a link to at least one photo to publish your spot..</p>

          <div className='imageInputs'>

            <input
              className='colorInput longInput'
              type="url"

              placeholder='Preview Image URL'
              value={previewImage}
              onChange={e => setPreviewImage(e.target.value)}
            />
            <input
              className='colorInput longInput'
              type="url"

              placeholder='Image URL'
              value={imageOne}
              onChange={e => setImageOne(e.target.value)}
            />
            <input
              className='colorInput longInput'
              type="url"

              placeholder='Image URL'
              value={imageTwo}
              onChange={e => setImageTwo(e.target.value)}
            />
            <input
              className='colorInput longInput'
              type="url"

              placeholder='Image URL'
              value={imageThree}
              onChange={e => setImageThree(e.target.value)}
            />
            <input
              className='colorInput longInput'
              type="url"

              placeholder='Image URL'
              value={imageFour}
              onChange={e => setImageFour(e.target.value)}
            />
          </div>

        </div>

          <div className='buttonDiv'>
            <button onClick={(e) => submit(e)} className='red'>Create Spot</button>
          </div>



      </div>

    </div>
  )
}