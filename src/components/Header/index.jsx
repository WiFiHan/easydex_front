import { useEffect, useState } from "react";
import lion from "../../assets/images/lion.jpeg";

import EasyDEXlogo from "../../assets/images/EasyDEX_logo.png";
import "./Header.css";

import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { logOut } from "../../apis/api";

const Header = () => {
  const [isUser, setIsUser] = useState("");

  useEffect(() => {
    const user = getCookie("access_token") ? true : false;
    setIsUser(user);
  }, []);

  const handleLogout = () => {
    const token = getCookie("refresh_token");
    logOut(token);
  };
  return (

    <div id="header-wrapper" className="flex justify-between bg-base-100">
      <div className="header-navbar">
        <div className="header-logo">
          <img
            src={EasyDEXlogo}
            className="header-logo-img btn btn-ghost normal-case"
          />
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>

    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 bg-slate-500 px-5 py-2.5 h-20"
    >
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" className="max-h-16" />
        <Link className="ml-3" to="/">
          Snulion Blog
        </Link>
      </div>

      <div className="flex">
        {!isUser ? (
          <>
            <Link to="/signin" className="mr-10 p-3 uppercase">
              sign In
            </Link>
            <Link to="/signup" className="mr-10 p-3 uppercase">
              sign up
            </Link>
          </>
        ) : (
          <>
            <Link to="/my" className="mr-10 p-3 uppercase">
              my page
            </Link>
            <Link to="/" onClick={handleLogout} className="mr-10 p-3 uppercase">
              log out
            </Link>
          </>
        )}

        {/* <Link to="/signup" className="p-3 uppercase">profile</Link> */}

      </div>
    </div>
  );
};

export default Header;
