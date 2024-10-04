"use client"; // Ensures this runs client-side in Next.js

import { useState } from 'react';

const NewItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => (prev < 20 ? prev + 1 : prev));
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex justify-center items-start pt-4">
      <div className="flex items-center bg-white shadow px-6 py-4 rounded-md">
        <span className="text-lg font-medium mr-6 text-black">{quantity}</span>
        <button 
          onClick={decrement}
          disabled={quantity === 1}
          className={`text-white rounded-md p-2 h-8 w-8 flex justify-center items-center ${
            quantity === 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`} // Conditional class for color
        >
          -
        </button>
        <button 
          onClick={increment}
          disabled={quantity === 20}
          className="text-white bg-blue-500 hover:bg-blue-600 rounded-md p-2 h-8 w-8 ml-2 flex justify-center items-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NewItem;
