"use client"; 
import React, { useState } from 'react';
import Item from './item';

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  // Sorting logic
  let sortedItems = [...items];
  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <>
      <div className="mt-4 flex items-center mb-4">
        <p className="text-white mr-2">Sort by:</p>
        <button
          onClick={() => setSortBy("name")}
          className={`px-6 py-2 rounded-md mr-8 ${sortBy === 'name' ? 'bg-orange-600 text-white' : 'bg-orange-300 text-black'}`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-6 py-2 rounded-md ${sortBy === 'category' ? 'bg-orange-600 text-white' : 'bg-orange-300 text-black'}`}
        >
          Category
        </button>
      </div>

      <div className="text-white capitalize font-bold">
        {sortedItems.map((item) => (
          <Item 
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={onItemSelect}
          />
        ))}
      </div>
    </>
  );
}
