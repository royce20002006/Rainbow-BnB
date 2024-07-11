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


        {errors.email && <div className='error'>{errors.email}</div>}
        <input
          className='colorInput signup'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email'
        />



        {errors.username && <div className='error'>{errors.username}</div>}
        <input
          className='colorInput signup'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder='Username'
        />



        {errors.firstName && <div className='error'>{errors.firstName}</div>}
        <input
          className='colorInput signup'
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder='First Name'
        />



        {errors.lastName && <div className='error'>{errors.lastName}</div>}
        <input
          className='colorInput signup'
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder='Last Name'
        />



        {errors.password && <div className='error'>{errors.password}</div>}
        <input
          className='colorInput signup'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />



        {errors.confirmPassword && (
          <div className='error'>{errors.confirmPassword}</div>
        )}
        <input
          className='colorInput signup'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder='Confirm Password'
        />

        <button 
        disabled={email.length <= 0 || username.length < 4  || firstName.length <= 0 || lastName.length <=0 || password.length < 6 || confirmPassword.length < 6 || password !== confirmPassword}
        className='red' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;