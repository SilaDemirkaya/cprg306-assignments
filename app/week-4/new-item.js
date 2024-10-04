"use client"; // This directive is required for client-side React hooks

import { useState } from 'react';

const NewItem = () => {
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  // Increment quantity, ensure it does not exceed 20
  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  // Decrement quantity, ensure it does not go below 1
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add a New Item</h1>
      <form className="space-y-4">
        <label className="block">
          <span>Item Name:</span>
          <input type="text" name="name" className="block w-full p-2 border rounded" />
        </label>
        
        <label className="block">
          <span>Item Price:</span>
          <input type="number" name="price" className="block w-full p-2 border rounded" />
        </label>

        <div className="flex items-center space-x-4">
          <button 
            type="button"
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="font-bold">{quantity}</span>
          <button 
            type="button"
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
            disabled={quantity === 20}
          >
            +
          </button>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default NewItem;
