import React from 'react';
import useAuth from '../../hooks/useAuth';
import { IoIosLogOut } from "react-icons/io";

const LogoutBtn = () => {
    const{logOut} = useAuth()
    return (
      <div>
        <button
          onClick={logOut}
          className="bg-indigo-600 flex justify-center gap-2 items-center text-white font-semibold px-2 py-2 rounded-lg hover:bg-indigo-700"
        >
          Logout
          <IoIosLogOut />
        </button>
      </div>
    );
};

export default LogoutBtn;