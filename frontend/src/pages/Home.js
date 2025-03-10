import { useEffect, useState, useRef } from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const recipeSectionRef = useRef(null);

  const images = ["/assets/img1.jpg", "/assets/img2.jpg", "/assets/img3.jpg"];

  const fetchAllRecipes = async () => {
    try {
      const response = await fetch("https://recipe-backend-gt7t.onrender.com/api/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    recipeSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const title = recipe.name || "No Title";
    const categoryMatch = category === "All" || recipe.category === category;
    const typeMatch = type === "All" || recipe.type === type;
    const searchMatch =
      search === "" || title.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div
      className="container"
      style={{ backgroundColor: "#f4acb7", paddingBottom: "50px" }}
    >
      <div
        className="hero"
        style={{
          backgroundColor: "#52b69a",
          color: "#fff",
          borderRadius: "10px",
          padding: "40px",
        }}
      >
        <div className="slider">
          <img
            src={images[0]}
            alt="Main Image"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>

        <h1>Welcome to CookCanvas</h1>
        <p>Discover and share amazing recipes!</p>
        <button
          onClick={handleExploreClick}
          style={{
            backgroundColor: "#ff5722",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Explore Recipes
        </button>
      </div>

      <div
        className="small-images"
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={images[1]}
          alt="Image 2"
          style={{
            width: "48%",
            height: "200px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
        <img
          src={images[2]}
          alt="Image 3"
          style={{
            width: "48%",
            height: "200px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        className="filters"
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="All">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="All">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        ref={recipeSectionRef}
        className="recipeList"
        style={{ marginTop: "30px" }}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;