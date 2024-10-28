"use client";

import React, { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';

const Page = () => {
  // Initialize state with data from items.json
  const [items, setItems] = useState(itemsData);

  // Event handler for adding new items
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <main className="bg-gray-900 min-h-screen p-5">
      <div className="w-full max-w-lg">
        <h1 className="text-white text-3xl font-bold mb-5">Shopping List</h1>
        {/* Pass items to ItemList and handleAddItem to NewItem */}
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
};

export default Page;
