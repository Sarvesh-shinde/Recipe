import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div style={styles.card}>
      <img src={recipe.image} alt={recipe.name} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{recipe.name}</h3>
        <p style={styles.description}>{recipe.description}</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  card: {
    width: "300px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Shadow on all sides
    overflow: "hidden",
    transition: "transform 0.2s",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  info: {
    padding: "15px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
  },
};

export default RecipeCard;
