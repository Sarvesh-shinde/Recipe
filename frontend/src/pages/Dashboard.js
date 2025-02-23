import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem('token');

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Fetch user recipes from an API or Firebase (simulating with static data)
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // Simulated data fetching for user-specific recipes
    // You should replace this with an actual fetch request from your API or Firebase
    const fetchedRecipes = [
      { id: 1, name: "Spaghetti Carbonara", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Chicken Alfredo", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Veggie Stir Fry", image: "https://via.placeholder.com/150" },
    ];
    setRecipes(fetchedRecipes);
  }, [token, navigate]);

  const handleEdit = (id) => {
    // Navigate to the edit page
    navigate(`/edit-recipe/${id}`);
  };

  const handleDelete = (id) => {
    // Perform the delete action here, e.g., send a delete request to your API or Firebase
    // Then, remove the deleted recipe from the state
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      
      <div style={styles.recipeList}>
        {recipes.map(recipe => (
          <div key={recipe.id} style={styles.recipeCard}>
            <span style={styles.recipeName}>{recipe.name}</span>
            <img src={recipe.image} alt={recipe.name} style={styles.recipeImage} />
            <button onClick={() => handleEdit(recipe.id)} style={styles.editButton}>Edit</button>
            <button onClick={() => handleDelete(recipe.id)} style={styles.deleteButton}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  recipeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
  },
  recipeCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    gap: '15px',
  },
  recipeName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  recipeImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
  },
};

export default Dashboard;
