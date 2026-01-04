import React, { use } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { Link } from 'react-router';
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";

const LoginBtn = () => {
      const { user, logOut } = use(AuthContext);

    return (
      <div>
        {user ? (
          <button
            onClick={logOut}
            className="bg-indigo-600 flex justify-center gap-2 items-center text-white font-semibold px-2 py-2 rounded-lg hover:bg-indigo-700"
          >
            Logout
            <IoIosLogOut />
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-600 flex justify-center gap-2 items-center text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
            <IoIosLogIn />
          </Link>
        )}
      </div>
    );
};

export default LoginBtn;