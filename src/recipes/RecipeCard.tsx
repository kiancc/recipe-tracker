import React, { useState, useEffect } from 'react';

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

const RecipeCard: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState<Omit<Recipe, 'id'>>({
    name: '',
    ingredients: [],
    instructions: '',
  });

  useEffect(() => {
    // Fetch recipes from API or local storage
    // For now, we'll use mock data
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        name: 'Spaghetti Carbonara',
        ingredients: [
          { id: 1, name: 'Spaghetti', amount: 400, unit: 'g' },
          { id: 2, name: 'Eggs', amount: 4, unit: 'pcs' },
          { id: 3, name: 'Pancetta', amount: 150, unit: 'g' },
        ],
        instructions: 'Cook spaghetti. Mix eggs, cheese, and pepper. Fry pancetta. Combine all ingredients.',
      },
    ];
    setRecipes(mockRecipes);
  }, []);

  const addRecipe = () => {
    const recipeWithId: Recipe = {
      ...newRecipe,
      id: recipes.length + 1,
    };
    setRecipes([...recipes, recipeWithId]);
    setNewRecipe({ name: '', ingredients: [], instructions: '' });
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: newRecipe.ingredients.length + 1,
      name: '',
      amount: 0,
      unit: '',
    };
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, newIngredient],
    });
  };

  return (
    <div className="recipe-section flex flex-col justify-center items-center">
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.name}: {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>

      <h3>Add New Recipe</h3>
      <input
        type="text"
        placeholder="Recipe Name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
      />
      <h4>Ingredients</h4>
      {newRecipe.ingredients.map((ingredient, index) => (
        <div key={ingredient.id}>
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) => {
              const updatedIngredients = [...newRecipe.ingredients];
              updatedIngredients[index].name = e.target.value;
              setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) => {
              const updatedIngredients = [...newRecipe.ingredients];
              updatedIngredients[index].amount = Number(e.target.value);
              setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
            }}
          />
          <input
            type="text"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) => {
              const updatedIngredients = [...newRecipe.ingredients];
              updatedIngredients[index].unit = e.target.value;
              setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
            }}
          />
        </div>
      ))}
      <button onClick={addIngredient}>Add Ingredient</button>
      <textarea
        placeholder="Instructions"
        value={newRecipe.instructions}
        onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      />
      <button onClick={addRecipe}>Add Recipe</button>
    </div>
  );
};

export default RecipeCard;