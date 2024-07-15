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
        return dispatch(sessionActions.login({ credential: 'FakeUser1', password: 'password2' })).then(closeModal)
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
        return dispatch(sessionActions.login({ credential, password })).then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data?.message) setErrors({message: data.message});
                    console.log(errors)
                }
            );
    };

    return (
        <>
            <h1 className="center heading login-heading">Log In</h1>
            <form className='formContainer' onSubmit={handleSubmit}>
                <div className="inputs">
            {errors.message && <span className="center error">The provided credentials were invalid.</span>}
                    <input
                        className="login-input colorInput"
                        type="text"
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required
                        placeholder="Username or Email"
                    />
                    <input
                        className="login-input colorInput"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />

                </div>
                <label htmlFor="errors">
                    <button id='button' className='red loginButton' disabled={credential.length < 4 || password.length < 6} type='submit'>Log In</button>
                </label>
                <button id="button" className='gray loginButton' onClick={(e) => demoLogin(e)}>log in as demo user</button>
            </form>
        </>
    )
}


