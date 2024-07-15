import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { getCurrentUserSpotsThunk } from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import './ManageSpots.css'

import OpenModalButton from '../../../components/Modal/OpenModalButton/OpenModalButton';
import DeleteSpotModal from './Modal/DeleteSpotModal/DeleteSpotModal';





export default function ManageSpots() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotState.currentUser)
    
    const user = useSelector(state => state.session.user)
  
    
    

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

  }, [dispatch, isLoaded, user])

  const goToSpot = (e,spot) => {
    
    e.preventDefault();
    e.stopPropagation();
    navigate(`/spots/${spot.id}`)
  }

  if (!isLoaded) {
    
      return <h1>Loading</h1>
    
    
  }

  const updateSpot = (e, ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('update functionality goes here')
  }
  
 




  return (
    <div className='headingAndAddSpot'>
        <h1 className='heading h1Manage'>Manage your Spots</h1>
        <button  id='button' className='red' onClick={(e) => goToSpot(e)}>Create a new Spot</button>
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
              <div>

              
              </div>
              <div onClick={(e) => {
                e.stopPropagation()
              }}>
              <OpenModalButton
              className='red'
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot}/>}
                preventDefault
                stopPropagation
                />

              </div>
            </div>
          
        </div>
      ))}
        </div>



    </div>
  )
}
