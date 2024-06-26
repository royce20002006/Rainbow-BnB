import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import ProfileButton from "./ProfileButton"
import * as SessionActions from '../../store/session';
import './Navigation.css';


export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = e => {
        e.preventDefault()
        e.stopPropagation();
        dispatch(SessionActions.logout());
    };

    const sessionLinks = sessionUser ? (
        <>
            <li>
                <ProfileButton user={sessionUser} />
            </li>
            {/* <li>
                <button onClick={logout}>Log Out</button>
            </li> */}
        </>
    ) : (
        <>
            <li>
                <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </>
    );

    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}
