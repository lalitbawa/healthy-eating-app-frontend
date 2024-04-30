import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, signOutAsync } from '../auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../images/logo-white.png"
import userIcon from "../../images/user (2).png"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(signOutAsync());
    navigate('/logout');
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt="Your Company"
                  />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <Link
                    to="/"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isCurrentPage('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Macro Calculator
                  </Link>
                  <Link
                    to="/recepie-generator"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isCurrentPage('/recepie-generator') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Recipe Generator AI
                  </Link>
                  <Link
                    to="/meditation"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isCurrentPage('/meditation') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Meditate
                  </Link>
                  <Link
                    to="/myprogress"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isCurrentPage('/myprogress') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    My Progress
                  </Link>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-6 w-6 rounded-full"
                        src={userIcon}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block w-full px-4 py-2 text-left text-sm text-gray-700')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                to="/"
                className={`block py-2 pl-3 pr-4 text-base font-medium ${
                  isCurrentPage('/') ? 'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                Macro Calculator
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/recepie-generator"
                className={`block py-2 pl-3 pr-4 text-base font-medium ${
                  isCurrentPage('/recepie-generator') ? 'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                Recipe Generator AI
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/meditation"
                className={`block py-2 pl-3 pr-4 text-base font-medium ${
                  isCurrentPage('/meditation') ? 'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                Meditate
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/myprogress"
                className={`block py-2 pl-3 pr-4 text-base font-medium ${
                  isCurrentPage('/myprogress') ? 'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                My Progress
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={userIcon}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="button"
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}