import React from 'react'
import { useSelector } from 'react-redux';

export default function SpotButton() {
    const sessionUser = useSelector(state => state.session.user);
  return (
    <>
    {sessionUser ? (<div>
        Create a spot
    </div>) : null}
    </>
  )
}
