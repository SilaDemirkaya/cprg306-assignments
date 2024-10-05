"use client"; // Ensures this runs client-side in Next.js

import { useState } from 'react';

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      alert("Please enter a name for the item.");
      return;
    }

    const item = {
      name,
      category,
      quantity,
    };

    console.log(item);
    alert(`Name: ${name}, Category: ${category}, Quantity: ${quantity}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="bg-blue-950 shadow px-6 py-4 rounded-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              id="name"
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-1 p-2 block w-full border rounded-md text-black"
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center bg-white shadow px-6 py-2 rounded-md">
              <span className="text-lg font-medium mx-4 text-black">{quantity}</span>
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={decrement}
                  disabled={quantity === 1}
                  className="text-white bg-blue-500 hover:bg-blue-900 rounded-md p-2 h-8 w-12 flex justify-center items-center" // Centered content
                >
                  -
                </button>
                <button 
                  type="button"
                  onClick={increment} 
                  className="text-white bg-blue-500 hover:bg-blue-600 rounded-md p-2 h-8 w-12 ml-2 flex justify-center items-center" // Centered content
                >
                  +
                </button>
              </div>
            </div>
            <select 
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-1 p-2 block border rounded-md text-black w-48"
            >
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat">Meat</option>
              <option value="Frozen Foods">Frozen Foods</option>
              <option value="Canned Goods">Canned Goods</option>
              <option value="Dry Goods">Dry Goods</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Household">Household</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-900 text-white p-2 rounded-md w-full">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>        
  );
}
