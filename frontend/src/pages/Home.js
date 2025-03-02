import { useEffect, useState, useRef } from "react";
import RecipeCard from "../components/RecipeCard"; // Import the RecipeCard component

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");

  const recipeSectionRef = useRef(null);

  // Extract the fetchRecipes function outside of the useEffect to avoid warning
  const fetchRecipes = () => {
    fetch("http://localhost:5000/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Recipes:", data);
        setRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  useEffect(() => {
    fetchRecipes();
  }, []); // Empty dependency array to call fetchRecipes only once on mount

  const handleExploreClick = () => {
    recipeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (category === "All" || recipe.category === category) &&
      (type === "All" || recipe.type === type) &&
      (search === "" || recipe.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

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
          <option value="All">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <select style={styles.dropdown} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
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
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p style={styles.loading}>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

// Styles (Updated for Full Responsiveness)
const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: `url('/assets/')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  hero: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.5)",
    backgroundImage: `url('/assets/bg.jpg')`,
    padding: "50px",
    borderRadius: "15px",
    color: "#fff",
    marginBottom: "20px",
    width: "90%", // Adjust for responsiveness
    minHeight: "390px",
  },
  filtersContainer: {
    display: "flex",
    flexWrap: "wrap", // Allow wrapping on smaller screens
    justifyContent: "center",
    gap: "15px",
    width: "100%",
    maxWidth: "800px",
    padding: "15px 0",
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
    width: "150px",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "90%",
    maxWidth: "1200px",
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
