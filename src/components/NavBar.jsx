import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/darkModeSlice";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef, useState } from "react";
import { clearUser } from "../features/authSlice.js";
import CreateProjectDialog from "./CreateProjectDialog.jsx";

const NavBar = () => {
  const darkmode = useSelector((state) => state.theme.darkMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const toggleDialog = () => {
    if (!ref.current) return;
    if (ref.current.hasAttribute("open")) {
      ref.current.close();
    } else {
      ref.current.showModal();
    }
  };

  return (
    <nav
      className="sticky w-full z-[99] h-[70px] px-3 top-0"
      data-theme={`${darkmode ? "dark" : "light"}`}>
      <div className="flex h-full items-center max-w-7xl mx-auto justify-between text-primary-content">
        <Link to="/" className="">
          TaskPlanner
        </Link>

        {/* Desktop Menu */}

        <ul className="hidden gap-7 items-center sm:flex">
          {user && (
            <li>
              <Link to="/">Projects</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={toggleDialog}>New Project</button>
            </li>
          )}
          {user && (
            <li className="bg-primary-content text-accent cursor-pointer rounded-md">
              <button
                className="px-2.5 py-1 font-semibold select-none"
                onClick={() => {
                  dispatch(clearUser());
                  navigate("/login", { replace: true });
                }}>
                Logout
              </button>
            </li>
          )}
          <div
            className="cursor-pointer"
            onClick={() => dispatch(toggleDarkMode())}>
            {darkmode ? (
              <svg
                className="fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              <svg
                className="fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </div>
        </ul>

        {/* Mobile Menu */}

        {menuOpen && (
          <ul className="flex gap-7 sm:hidden flex-col absolute top-[70px] right-0 items-end bg-base-200 w-full py-10 px-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
            {user && (
              <li onClick={() => setMenuOpen(false)}>
                <Link to="/">Home</Link>
              </li>
            )}
            {user && (
              <li onClick={() => setMenuOpen(false)}>
                <button onClick={toggleDialog}>New Project</button>
              </li>
            )}
            {user && (
              <li className="bg-primary-content text-accent cursor-pointer rounded-md">
                <button
                  className="px-2.5 py-1 font-semibold select-none"
                  onClick={() => {
                    dispatch(clearUser());
                    navigate("/login", { replace: true });
                  }}>
                  Logout
                </button>
              </li>
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(toggleDarkMode());
                setMenuOpen(false);
              }}>
              {darkmode ? (
                <svg
                  className="fill-current w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              ) : (
                <svg
                  className="fill-current w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              )}
            </div>
          </ul>
        )}
        <button
          className="sm:hidden flex p-2"
          onClick={() => setMenuOpen((prev) => !prev)}>
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>
      <CreateProjectDialog toggleDialog={toggleDialog} ref={ref} />
    </nav>
  );
};
export default NavBar;
