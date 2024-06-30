import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export default function Spot() {
    const {id} = useParams();
    const spot = useSelector(state => state.spotState.byId[id])
    console.log(spot)
  return (
    <div>
        <h1>{spot.name}</h1>
        <div>{spot.city}, {spot.state}, {spot.country}</div>
        <div><img src={spot.previewImage}/></div>
        <div>Hosted by {spot.ownerId}</div>
    </div>
  )
}
