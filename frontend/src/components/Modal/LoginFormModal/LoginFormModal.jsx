import { useState } from "react"
import * as sessionActions from '../../../store/session';
import { useDispatch } from "react-redux";
import { useModal } from '../../../context/Modal';
import './LoginForm.css';

export default function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return dispatch(sessionActions.login({credential: 'FakeUser1', password: 'password2'})).then(closeModal)
        .catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        );

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password})).then(closeModal)
        .catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        );
    };

  return (
    <>
    <h1 id="login">Log In</h1>
    <form className="formContainer" onSubmit={handleSubmit}>
        
            <input
            className="colorInput login"
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
            />
        
          
            <input
            className="colorInput login"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
            />
        
        <label htmlFor="errors">
            {errors.credential && <p>{errors.credential}</p>}
            <button className="red" type='submit'>Log In</button>
        </label>
        <button className="red" onClick={(e) => demoLogin(e)}>log in as demo user</button>
    </form>
    </>
  )
}


