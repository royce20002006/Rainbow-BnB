import { useState } from 'react';
import './SpotForm.css'

export default function SpotForm() {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');



  return (
    <div className="formDiv">
        <div  className="location">
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

        </div>

    </div>
  )
}