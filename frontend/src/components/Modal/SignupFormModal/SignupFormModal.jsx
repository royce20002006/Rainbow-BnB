import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import * as sessionActions from '../../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 id='signup'>Sign Up</h1>
      <form className='form-container' onSubmit={handleSubmit}>


        <input
          className='colorInput signup'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
        />

        {errors.email && <p>{errors.email}</p>}


        <input
          className='colorInput signup'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder='Username'
        />

        {errors.username && <p>{errors.username}</p>}


        <input
          className='colorInput signup'
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder='First Name'
        />

        {errors.firstName && <p>{errors.firstName}</p>}


        <input
          className='colorInput signup'
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder='Last Name'
        />

        {errors.lastName && <p>{errors.lastName}</p>}


        <input
          className='colorInput signup'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />

        {errors.password && <p>{errors.password}</p>}


        <input
          className='colorInput signup'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder='Confirm Password'
        />

        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button className='red' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;