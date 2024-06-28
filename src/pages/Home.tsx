import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Recipe {
  id: number;
  name: string;
}

interface GroceryItem {
  id: number;
  name: string;
}

const HomePage: React.FC = () => {
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [groceryListPreview, setGroceryListPreview] = useState<GroceryItem[]>([]);

  useEffect(() => {
    // Fetch recent recipes and grocery list preview
    // For now, we'll use mock data
    const mockRecentRecipes: Recipe[] = [
      { id: 1, name: 'Spaghetti Carbonara' },
      { id: 2, name: 'Chicken Curry' },
      { id: 3, name: 'Caesar Salad' },
    ];
    setRecentRecipes(mockRecentRecipes);

    const mockGroceryListPreview: GroceryItem[] = [
      { id: 1, name: 'Milk' },
      { id: 2, name: 'Eggs' },
      { id: 3, name: 'Bread' },
    ];
    setGroceryListPreview(mockGroceryListPreview);
  }, []);

  return (
    <div className="home-page flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Recipe Tracker App</h1>
      <div className="grid grid-cols-2 gap-4">
        <section className="quick-actions rounded-md p-2 bg-orange-200 flex flex-col">
          <h2 className="text-2xl pb-4">Quick Actions</h2>
          <Link to="/recipes/new">
            <button>Add New Recipe</button>
          </Link>
          <Link to="/grocery-list">
            <button>View Grocery List</button>
          </Link>
        </section>

        <section className="recent-recipes">
          <h2>Recent Recipes</h2>
          <ul>
            {recentRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
              </li>
            ))}
          </ul>
          <Link to="/recipes">View All Recipes</Link>
        </section>

        <section className="grocery-list-preview">
          <h2>Grocery List Preview</h2>
          <ul>
            {groceryListPreview.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <Link to="/grocery-list">View Full Grocery List</Link>
        </section>

        <section className="app-summary">
          <h2>App Summary</h2>
          <p>Total Recipes: {recentRecipes.length}</p>
          <p>Items in Grocery List: {groceryListPreview.length}</p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;