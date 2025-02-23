import React from "react";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div style={styles.card}>
      <img src={recipe.image} alt={recipe.title} style={styles.image} />
      <h3 style={styles.title}>{recipe.title}</h3>
      <p style={styles.description}>{recipe.description}</p>
    </div>
  );
};

const styles = {
  card: {
    width: "250px",
    background: "#fff",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  description: {
    fontSize: "14px",
    color: "#666",
  },
};

export default RecipeCard;
