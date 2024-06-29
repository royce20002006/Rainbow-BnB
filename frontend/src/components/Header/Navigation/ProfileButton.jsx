import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../../Modal/LoginFormModal/LoginFormModal';
import SignupFormModal from '../../Modal/SignupFormModal/SignupFormModal';
import { GiHamburgerMenu } from "react-icons/gi";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='dropdownButton' onClick={toggleMenu}>
        <GiHamburgerMenu />
        <FaUserCircle />
      </button>
      <ul id='profileMenu' className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='profileMenu'>
            <div className='userDetails'>
            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            </div>
            <div className='manageSpots cursor'>
            <li>Manage Spots</li>
            <li>Manage Reviews</li>
            </div>
            <li className='logout'>
              <button className='button' onClick={logout}>Log Out</button>
            </li>
          </div>

        ) : (
          <div className='profileMenu'>
            <OpenModalMenuItem
              className='cursor'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className='cursor'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;