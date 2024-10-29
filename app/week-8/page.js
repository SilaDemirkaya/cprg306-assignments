// page.js
"use client";

import React, { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

const Page = () => {
  const [items, setItems] = useState(itemsData); // Load initial items from items.json
  const [selectedItemName, setSelectedItemName] = useState("");

  // Function to clean item names by removing extra text and emojis
  const cleanItemName = (itemName) => {
    return itemName.split(',')[0].replace(/[^a-zA-Z ]/g, "").trim();  // Clean the name
  };

  // Handle adding a new item to the list
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);  // Add new item to the list
  };

  // Handle selecting an item and clean up the name for API
  const handleItemSelect = (itemName) => {
    const cleanName = cleanItemName(itemName); // Clean up the item name
    setSelectedItemName(cleanName);  // Set cleaned name for meal ideas
  };

  return (
    <main className="bg-gray-900 min-h-screen p-5">
      <div className="flex">
        <div className="w-full max-w-lg mr-5">
          <h1 className="text-white text-3xl font-bold mb-5">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="w-full max-w-lg">
          {selectedItemName && (
            <MealIdeas ingredient={selectedItemName} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
