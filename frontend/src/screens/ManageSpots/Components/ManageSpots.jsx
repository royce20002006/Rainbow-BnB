import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserSpotsThunk } from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import './ManageSpots.css'

export default function ManageSpots() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotState.currentUser)
    
    

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    //grab data
    const getData = async () => {
      await dispatch(getCurrentUserSpotsThunk());
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded,])

  const goToSpot = (e,spot) => {
    
    e.preventDefault();
    e.stopPropagation();
    navigate(`/spots/${spot.id}`)
  }

  if (!isLoaded) {
    
      return <h1>Loading</h1>
    
    
  }

  const updateSpot = (e, spot) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('update functionality goes here')
  }
  const deleteSpot = (e, spot) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('delete functionality goes here')
  }




  return (
    <div className='headingAndAddSpot'>
        <h1 className='heading h1Manage'>Manage your Spots</h1>
        <button className='red' onClick={() => navigate('/spots/new')}>Create a new Spot</button>
        <div className='allSpotsContainer'>
        {spots.map((spot, idx) => (
        <div onClick={e => goToSpot(e,spot)} key={`${idx}--${spot.id}`} role='tooltip'>
            
            <img src={spot.previewImage} />
            <div className="locationAndRating">
              <span className="spotLocation spotInfo">{spot.city}, {spot.state} </span>
              <span className="rating"><FaStar className="star" /> {spot.avgRating ? spot.avgRating : 'New'
              }</span>

            </div>

            <span className="spotPrice spotInfo">${spot.price}</span><span> night </span>

            <div className='imageButtons'>
              <button onClick={(e, spot) => updateSpot(e, spot)} className='red'>update</button>
              <button onClick={(e, spot) => deleteSpot(e, spot)}
              className='red'>delete</button>
            </div>
          
        </div>
      ))}
        </div>



    </div>
  )
}
