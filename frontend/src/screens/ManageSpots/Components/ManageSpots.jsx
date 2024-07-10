import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserSpotsThunk } from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

export default function ManageSpots() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotState.currentUser)

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    //grab data
    const getData = async () => {
      dispatch(getCurrentUserSpotsThunk());
      setIsLoaded(true);
    }

    if (!isLoaded) {
      getData();
    }

  }, [dispatch, isLoaded])

  const goToSpot = (e,spot) => {
    
    e.preventDefault();
    e.stopPropagation();
    navigate(`/spots/${spot.id}`)
  }

  if (!isLoaded) {
    setTimeout(() => {
      return <h1>Loading</h1>
    }, 1000
    )
  }




  return (
    <div className='headingAndAddSpot'>
        <h1 className='heading'>Manage your Spots</h1>
        <button className='red' onClick={() => navigate('/spots/new')}>Create a new Spot</button>



    </div>
  )
}
