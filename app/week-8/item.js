import React from 'react';

const Item = ({ name, quantity, category, onSelect }) => {
  return (
    <div 
      className="bg-gray-800 text-white p-3 mb-4 rounded shadow-lg cursor-pointer hover:bg-orange-500 transition-all"
      onClick={() => onSelect(name)}  
    >
      <div className="text-x1 font-bold">{name}</div>
      <div className="text-sm opacity-75">Buy {quantity} in {category}</div>
    </div>
  );
};

export default Item;
