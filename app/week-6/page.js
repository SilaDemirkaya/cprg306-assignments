// page.js
import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
      <main className="bg-gray-900 min-h-screen p-5">
          <div className="w-full max-w-lg">
              <h1 className="text-white text-3xl font-bold mb-5">Shopping List</h1>
              <ItemList />
          </div>
      </main>
  );
};

export default Page;
