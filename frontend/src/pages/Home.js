import { useEffect, useState, useRef } from "react";
import RecipeCard from "../components/RecipeCard"; // Import the RecipeCard component

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const recipeSectionRef = useRef(null); // Reference for recipe section

  // Fetch recipes when the component loads
  useEffect(() => {
    fetch("https://your-api.com/recipes") // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Recipes:", data);
        setRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Scroll to recipe section when clicking "Explore Recipes"
  const handleExploreClick = () => {
    recipeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Recipe Hub</h1>
        <p style={styles.subtitle}>Discover and share amazing recipes!</p>
        <button style={styles.exploreBtn} onClick={handleExploreClick}>
          Explore Recipes
        </button>
      </div>

      {/* Filters Section */}
      <div style={styles.filtersContainer}>
        <select style={styles.dropdown} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Category All</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <select style={styles.dropdown} value={type} onChange={(e) => setType(e.target.value)}>
          <option>Type All</option>
          <option>Veg</option>
          <option>Non-Veg</option>
        </select>
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          style={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipe List Section */}
      <div ref={recipeSectionRef} style={styles.recipeList}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p style={styles.loading}>Loading recipes...</p>
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: `url('/assets/your-image.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  hero: {
    textAlign: "center",
    background: "rgba(0, 0, 0, 0.5)",
    padding: "50px",
    borderRadius: "10px",
    color: "#fff",
    marginBottom: "20px",
  },
  filtersContainer: {
    display: "flex",
    justifyContent: "flex-end", // Aligns filters to the right
    gap: "15px",
    width: "80%",
    padding: "15px 0",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  search: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    width: "220px",
    outline: "none",
  },
  recipeList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    width: "80%",
    paddingTop: "20px",
  },
  loading: {
    color: "#fff",
    fontSize: "20px",
  },
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  exploreBtn: {
    padding: "10px 20px",
    fontSize: "18px",
    background: "#ff5722",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Home;
