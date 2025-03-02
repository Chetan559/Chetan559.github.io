import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex w-full items-center bg-gray-50 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-semibold text-gray-800 dark:text-white"
          >
            Chetan Sharma
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)} // Toggles menu state
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {open ? (
              <span className="text-2xl font-bold dark:text-zinc-50"> × </span>
            ) : (
              <>
                <span className="block h-[2px] w-6 bg-gray-800 dark:bg-white mb-1"></span>
                <span className="block h-[2px] w-6 bg-gray-800 dark:bg-white mb-1"></span>
                <span className="block h-[2px] w-6 bg-gray-800 dark:bg-white"></span>
              </>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-6">
              <ListItem NavLink="/">Home</ListItem>
              <ListItem NavLink="/about">About</ListItem>
              <ListItem NavLink="/contact">Contact</ListItem>
              <ListItem NavLink="/utilities">Utilites</ListItem>
              {/* <DropdownMenu /> */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {open && (
        <div className="fixed inset-0 bg-white dark:bg-gray-800 z-50 flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-6 text-lg">
            <ListItem NavLink="/" onClick={() => setOpen(false)}>
              Home
            </ListItem>
            <ListItem NavLink="/about" onClick={() => setOpen(false)}>
              About
            </ListItem>
            <ListItem NavLink="/contact" onClick={() => setOpen(false)}>
              Contact
            </ListItem>
            <ListItem NavLink="/utilities" onClick={() => setOpen(false)}>
              Utilites
            </ListItem>
            {/* <DropdownMenu closeMenu={() => setOpen(false)} /> */}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

// Reusable ListItem Component
const ListItem = ({ children, NavLink, onClick }) => {
  return (
    <li>
      <Link
        to={NavLink}
        onClick={onClick}
        className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition"
      >
        {children}
      </Link>
    </li>
  );
};
