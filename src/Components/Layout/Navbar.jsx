import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Your Company</span>
            </a>
          </div>
          <div className="hidden md:flex space-x-10">
            <a href="#" className="text-base font-medium text-gray-300 hover:text-white">Home</a>
            <a href="#" className="text-base font-medium text-gray-300 hover:text-white">About</a>
            <a href="#" className="text-base font-medium text-gray-300 hover:text-white">Services</a>
            <a href="#" className="text-base font-medium text-gray-300 hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
