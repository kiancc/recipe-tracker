import React, { useState, useEffect } from 'react';

interface GroceryItem {
  id: number;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
}

const GroceryListPage: React.FC = () => {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<GroceryItem, 'id' | 'checked'>>({
    name: '',
    amount: 0,
    unit: '',
  });

  useEffect(() => {
    // Fetch grocery list from API or local storage
    // For now, we'll use mock data
    const mockGroceryList: GroceryItem[] = [
      { id: 1, name: 'Milk', amount: 1, unit: 'liter', checked: false },
      { id: 2, name: 'Eggs', amount: 12, unit: 'pcs', checked: false },
      { id: 3, name: 'Bread', amount: 1, unit: 'loaf', checked: true },
    ];
    setGroceryList(mockGroceryList);
  }, []);

  const addItem = () => {
    const itemWithId: GroceryItem = {
      ...newItem,
      id: groceryList.length + 1,
      checked: false,
    };
    setGroceryList([...groceryList, itemWithId]);
    setNewItem({ name: '', amount: 0, unit: '' });
  };

  const toggleItemCheck = (id: number) => {
    setGroceryList(groceryList.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: number) => {
    setGroceryList(groceryList.filter(item => item.id !== id));
  };

  return (
    <div className="grocery-list-page">
      <h2>Grocery List</h2>
      <ul>
        {groceryList.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItemCheck(item.id)}
            />
            <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
              {item.name}: {item.amount} {item.unit}
            </span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Add New Item</h3>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={newItem.amount}
        onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Unit"
        value={newItem.unit}
        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
      />
      <button onClick={addItem}>Add Item</button>

      <div>
        <h3>Summary</h3>
        <p>Total Items: {groceryList.length}</p>
        <p>Items Checked: {groceryList.filter(item => item.checked).length}</p>
        <p>Items Remaining: {groceryList.filter(item => !item.checked).length}</p>
      </div>
    </div>
  );
};

export default GroceryListPage;