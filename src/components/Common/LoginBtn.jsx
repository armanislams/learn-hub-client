import React, { use } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router';

const LoginBtn = () => {
      const { user, logOut } = use(AuthContext);

    return (
      <div>
        {user ? (
          <button
            onClick={logOut}
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
          </Link>
        )}
      </div>
    );
};

export default LoginBtn;