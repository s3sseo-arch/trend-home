import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    name: 'Aluminum Window',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Strong, modern, and low-maintenance.',
    link: '/window-configurator?material=aluminium',
  },
  {
    name: 'Iron Window',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Classic and secure iron-framed windows.',
    link: '/window-configurator?material=pvc',
  },
  {
    name: 'Wooden Window',
    image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Natural aesthetics with durable wood finish.',
    link: '/window-configurator?material=wood',
  },
  {
    name: 'PVC Window',
    image: 'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Durable and energy-efficient PVC windows.',
    link: '/window-configurator?material=pvc',
  },
];

const ShopPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-48 sm:h-64 lg:h-72 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-center px-4">
            Discover Your Perfect Window
          </h1>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mt-8 sm:mt-12 mb-6 sm:mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Window Collection</h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
          Select your favorite type and start customizing today.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 pb-12 sm:pb-20">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 group overflow-hidden"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">{product.description}</p>
              <Link to={product.link} className="w-full mt-4">
                <button className="w-full py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  Customize Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;