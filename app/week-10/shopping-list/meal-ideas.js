"use client"; 
import React, { useState, useEffect } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); // Track the selected meal

  // Fetch meals from the API
  const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  };

  // Function to fetch and load meal ideas
  const loadMealIdeas = async () => {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
    }
  };

  // Load meals when the ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  // Fetch detailed meal info and toggle ingredients visibility when a meal is clicked
  const handleMealClick = async (mealId) => {
    if (selectedMeal && selectedMeal.idMeal === mealId) {
      // If clicking the same meal, toggle it (close the ingredients)
      setSelectedMeal(null);
    } else {
      // Otherwise, fetch the detailed meal info and set it
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      setSelectedMeal(data.meals[0]); // Set the clicked meal's details
    }
  };

  return (
    <div className="meal-ideas">
      <h2 className="text-2xl font-bold text-white mb-4">Meal Ideas</h2>
      
      {/* Check if no meals are found */}
      {meals.length === 0 ? (
        <p className="text-white">No meal ideas found for {ingredient}</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li 
              key={meal.idMeal} 
              className={`cursor-pointer p-4 mb-2 rounded-md ${
                selectedMeal && selectedMeal.idMeal === meal.idMeal ? 'bg-orange-700 text-white' : 'bg-gray-800 text-white'
              } hover:bg-orange-500 transition-all`}
              onClick={() => handleMealClick(meal.idMeal)}
            >
              <p>{meal.strMeal}</p>

              {/* Show ingredients only for the selected meal */}
              {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
                <div className="mt-2 bg-orange-700 p-4 rounded-md">
                  <p className="font-bold mb-2">Ingredients needed:</p>
                  <ul className="list-disc ml-5">
                    {/* Dynamically display all ingredients */}
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(index => {
                      const ingredient = selectedMeal[`strIngredient${index}`];
                      const measure = selectedMeal[`strMeasure${index}`];
                      return ingredient && ingredient.trim() !== '' ? (
                        <li key={index}>{`${ingredient} (${measure})`}</li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealIdeas;
