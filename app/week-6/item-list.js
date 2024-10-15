"use client"; 

import React, { useState } from 'react';
import Item from './item';
import itemsData from './items.json';

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [grouped, setGrouped] = useState(false);

  // Helper function to group items by category
  const groupItemsByCategory = (items) => {
    return items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  // Sorting and grouping logic
  let sortedItems = [...itemsData];
  let groupedItems = {};

  if (grouped) {
    groupedItems = groupItemsByCategory(sortedItems);
    // Sort categories and items within categories
    Object.keys(groupedItems).sort().forEach(category => {
      groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
    });
  } else if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <>
      <div className="flex justify-center my-4">
        <button onClick={() => { setSortBy("name"); setGrouped(false); }} 
          className={`px-6 py-2 rounded-md mr-2 ${sortBy === 'name' && !grouped ? 'bg-orange-500 text-white' : 'bg-orange-900 text-white'}`}>
          Name
        </button>
        <button onClick={() => { setSortBy("category"); setGrouped(false); }} 
          className={`px-6 py-2 rounded-md mr-2 ${sortBy === 'category' && !grouped ? 'bg-orange-500 text-white' : 'bg-orange-900 text-white'}`}>
          Category
        </button>
        <button onClick={() => setGrouped(true)} 
          className={`px-6 py-2 rounded-md ${grouped ? 'bg-orange-500 text-white' : 'bg-orange-900 text-white'}`}>
          Group by Category
        </button>
      </div>

      <div className="text-white capitalize font-bold ">
        {grouped ? (
          Object.keys(groupedItems).sort().map(category => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {groupedItems[category].map(item => (
                  <li key={item.id}>
                    <Item 
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          sortedItems.map((item) => (
            <Item 
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))
        )}
      </div>
    </>
  );
}
