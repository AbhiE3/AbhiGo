import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side navigation */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 125 125"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M110.8,103.6h-7.6V114c0,3.6-2.9,6.5-6.5,6.5h-9c-3.6,0-6.5-2.9-6.5-6.5v-10.3H41.5V114c0,3.6-2.9,6.5-6.5,6.5 h-9c-3.6,0-6.5-2.9-6.5-6.5v-10.3H12v-82c0-7.6,4.4-13.1,13.3-16.5c17.6-6.9,54.6-6.9,72.3,0c8.9,3.4,13.3,8.9,13.3,16.5V103.6 L110.8,103.6L110.8,103.6z M118.6,40.4h-3.8V62h3.8c2.4,0,4.3-1.9,4.3-4.3V44.7C122.9,42.3,121,40.4,118.6,40.4L118.6,40.4z M4.3,40.4h3.8V62H4.3C1.9,62,0,60.1,0,57.7V44.7C0,42.3,1.9,40.4,4.3,40.4L4.3,40.4z M46.4,8.6h30.1c0.9,0,1.6,0.7,1.6,1.6v5.2 c0,0.9-0.7,1.6-1.6,1.6H46.4c-0.9,0-1.6-0.7-1.6-1.6v-5.2C44.8,9.3,45.5,8.6,46.4,8.6L46.4,8.6z M22.9,23.2h76.7 c1,0,1.9,0.9,1.9,1.9v42.8c0,1-0.9,1.9-1.9,1.9H22.9c-1,0-1.9-0.9-1.9-1.9V25.1C21,24.1,21.8,23.2,22.9,23.2L22.9,23.2L22.9,23.2 L22.9,23.2z M98.6,84.9c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2,3-2,4.9c0,1.9,0.7,3.5,2,4.8 c1.4,1.3,3,2,4.9,2c1.9,0,3.6-0.7,4.9-2C98,88.4,98.6,86.8,98.6,84.9L98.6,84.9L98.6,84.9L98.6,84.9z M38.1,84.9 c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3-2,4.9c0,1.9,0.6,3.5,2,4.8c1.3,1.3,3,2,4.9,2 c2,0,3.6-0.7,4.9-2C37.4,88.4,38.1,86.8,38.1,84.9L38.1,84.9L38.1,84.9L38.1,84.9z" 
                    // fill="purple"
                    // d="M0 2560 l0 -2560 2560 0 2560 0 0 2560 0 2560 -2560 0 -2560 0 0 -2560z"
                  />
                </svg>
                <span className="text-xl font-bold">AbhiGo</span>
              </Link>

              {token && (
                <Link
                  to="/my-bookings"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                >
                  My Bookings
                </Link>
              )}
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              {token ? (
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white shadow-sm rounded-lg p-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AbhiGo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Wrapper;
