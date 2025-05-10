import { useModal } from '../../../../../../context/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../../../Spot/Spot.css'
import { createReviewThunk } from '../../../../../../store/reviews';
import { getSpotsThunk } from '../../../../../../store/spots';



export default function CreateReviewModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [submitErrors, setSubmitErrors] = useState('')
  const [description, setDescription] = useState(``)
  const [rating, setRating] = useState(null);
  const [hoverVal, setHoverVal] = useState(null);
  const [image, setImage] = useState({})

  const handleMouseOverStar = value => {
    setHoverVal(value)
  };

  const handleMouseLeaveStar = () => {
    setHoverVal(undefined)
  }

  const handleClickStar = value => {
    setRating(value)
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];

    if (file) {
      // Store old image's public_id if it exists
      const oldImagePublicId = image[imageType]?.public_id;

      // Prepare the form data for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset");

      try {
        // Upload the new image to Cloudinary
        const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.secure_url) {
          // If there is an old image, delete it from Cloudinary
          if (oldImagePublicId) {
            // Call Cloudinary's API to delete the old image using the public_id
            await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/destroy`, {
              method: "POST",
              body: JSON.stringify({
                public_id: oldImagePublicId, // public_id of the old image
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }

          // Update the form state with the new image URL and public_id
          setImage({
            url: data.secure_url,
            public_id: data.public_id, // store the public_id for deletion later
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };



  const colors = {
    orange: "#F2C265",
    grey: "a9a9a9"
  }

  const postReview = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const reviewAndRating = ({
      review: description,
      stars: rating

    })

    const newReview = await dispatch(createReviewThunk(id, reviewAndRating))

    if (!newReview.ok && newReview.ok !== undefined) {
      const data = await newReview.json();

      setSubmitErrors(data.message)
    } else {
      await dispatch(getSpotsThunk())
      closeModal();
    }





  }

  return (
    <div className='container'>
      <div className='text'>
        <h1 className='heading confirm'>How was your stay?</h1>
        <div className='error'>{submitErrors && submitErrors}</div>
        <div><textarea placeholder='Leave your review here...' className='colorInput longInput' name="description"
          value={description} onChange={(e) => setDescription(e.target.value)}
          id="description"></textarea></div>
      </div>
      <div>
        {[...Array(5)].map((_star, idx) => (

          <FaStar className='star'
            key={idx}
            size={25}
            onChange={(e => setRating(e.target.value))}
            color={(hoverVal || rating) > idx ? colors.orange : colors.grey}
            onClick={() => handleClickStar(idx + 1)}
            onMouseOver={() => handleMouseOverStar(idx + 1)}
            onMouseLeave={() => handleMouseLeaveStar}
          />
        ))}
        <label className='normal stars' htmlFor="stars">Stars</label>
      </div>

      <div className='buttons'>
        <button disabled={!rating || description.length < 10} className='big red normal' onClick={(e) => postReview(e)}>Submit Review</button>


      </div>
    </div>
  )
}
