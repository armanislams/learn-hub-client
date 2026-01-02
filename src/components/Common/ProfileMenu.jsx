import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

const ProfileMenu = () => {
    const { user } = useAuth()
    console.log(user);
    
    return (
      <div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <p>Hello !! {user?.displayName}</p>
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <Link to={'/dashboard/my-profile'}>My Profile</Link>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default ProfileMenu;
