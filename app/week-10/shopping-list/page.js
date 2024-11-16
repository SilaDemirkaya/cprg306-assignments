"use client";

import React, { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service"; // Added deleteItem

const Page = () => {
  const { user } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Load items from Firestore
  const loadItems = async () => {
    if (!user) return;
    const fetchedItems = await getItems(user.uid); // Fetch items for the current user
    setItems(fetchedItems); // Set the items state
  };

  // useEffect to load items on component mount
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]); // Dependencies include user to reload if it changes

  // Function to clean item names by removing extra text and emojis
  const cleanItemName = (itemName) => {
    return itemName.split(",")[0].replace(/[^a-zA-Z ]/g, "").trim(); // Clean the name
  };

  // Handle adding a new item to the list
  const handleAddItem = async (newItem) => {
    if (!user || !newItem.name || !newItem.category) return;
    const id = await addItem(user.uid, newItem); // Add the item to Firestore
    setItems([...items, { id, ...newItem }]); // Update the local state
  };

  // Handle deleting an item from the list
  const handleDeleteItem = async (itemId) => {
    if (!user) return;
    await deleteItem(user.uid, itemId); // Delete the item from Firestore
    setItems(items.filter((item) => item.id !== itemId)); // Remove the item from local state
  };

  // Handle selecting an item and clean up the name for API
  const handleItemSelect = (itemName) => {
    const cleanName = cleanItemName(itemName); // Clean up the item name
    setSelectedItemName(cleanName); // Set cleaned name for meal ideas
  };

  // Redirect to the landing page if the user is not logged in
  if (!user) {
    router.push("/week-9"); // Redirects to the landing page
    return null; // Don't render the rest of the component
  }

  return (
    <main className="bg-gray-900 min-h-screen p-5">
      <div className="flex">
        <div className="w-full max-w-lg mr-5">
          <h1 className="text-white text-3xl font-bold mb-5">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onDeleteItem={handleDeleteItem} // Pass delete handler to ItemList
          />
        </div>
        <div className="w-full max-w-lg">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </div>
      </div>
    </main>
  );
};

export default Page;
