import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRecipes();
  }, [token, navigate]);

  // Fetch recipes from backend
  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRecipes(data);
      } else {
        console.error("Error fetching recipes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Handle Edit Recipe
  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  // Handle Delete Recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <h1>Your Recipes</h1>
      
      {recipes.length === 0 ? (
        <p>No recipes found. Start adding some!</p>
      ) : (
        <div style={styles.recipeList}>
          {recipes.map((recipe) => (
            <div key={recipe._id} style={styles.recipeCard}>
              <span style={styles.recipeName}>{recipe.name}</span>
              <img
                src={recipe.image || "https://via.placeholder.com/150"}
                alt={recipe.name}
                style={styles.recipeImage}
              />
              <button onClick={() => handleEdit(recipe._id)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(recipe._id)} style={styles.deleteButton}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styling
const styles = {
  recipeList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  recipeCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    gap: "15px",
  },
  recipeName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  recipeImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default Dashboard;
