import React from 'react';
import { Link } from 'react-router';
import { IoIosLogIn } from "react-icons/io";
import LogoutBtn from './LogoutBtn';
import useAuth from '../../hooks/useAuth';

const LoginBtn = () => {
      const { user } = useAuth();

    return (
      <div>
        {user ? (
         <LogoutBtn/>
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