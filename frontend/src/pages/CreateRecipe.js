import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUpload } from "react-icons/fa";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    cookingTime: "",
    image: null,
    imagePreview: null,
    youtubeUrl: "",
    category: "Breakfast",
    type: "Veg",
    ingredients: [],
    steps: [],
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipe({
        ...recipe,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const addStep = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (recipe.image) {
      const formData = new FormData();
      formData.append("file", recipe.image);
      formData.append("upload_preset", "your_cloudinary_preset");
      
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    const newRecipe = { ...recipe, image: imageUrl };

    try {
      const res = await fetch("https://your-api-url.com/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });
      const result = await res.json();
      console.log("Recipe saved:", result);
      alert("Recipe created successfully!");
    } catch (error) {
      console.error("Error saving recipe", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="col-md-8 col-lg-6 p-4 shadow rounded bg-white">
        <h2 className="text-center mb-4 fw-bold" style={{ fontSize: "32px", textTransform: "uppercase", letterSpacing: "2px", color: "#dc3545", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
          🍽️ Create Recipe
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <textarea name="description" placeholder="Recipe Description" value={recipe.description} onChange={handleChange} className="form-control"></textarea>
          </div>
          <div className="mb-3">
            <input type="text" name="cookingTime" placeholder="Cooking Time (e.g., 30 mins)" value={recipe.cookingTime} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3 text-center p-3 border rounded position-relative" style={{ borderStyle: "dashed", cursor: "pointer" }}>
            <label htmlFor="imageUpload" className="form-label d-block">
              {recipe.imagePreview ? (
                <img src={recipe.imagePreview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "120px" }} />
              ) : (
                <div className="text-muted">
                  <FaUpload size={24} className="mb-2" />
                  <p>Click to Upload Image</p>
                </div>
              )}
            </label>
            <input type="file" id="imageUpload" onChange={handleImageUpload} className="form-control d-none" />
          </div>

          <div className="mb-3">
            <input type="text" name="youtubeUrl" placeholder="YouTube Video URL" value={recipe.youtubeUrl} onChange={handleChange} className="form-control" />
          </div>

          <div className="row mb-3">
            <div className="col">
              <select name="category" value={recipe.category} onChange={handleChange} className="form-select">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div className="col">
              <select name="type" value={recipe.type} onChange={handleChange} className="form-select">
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <button type="button" onClick={addIngredient} className="btn btn-success">+ Add Ingredient</button>
            <button type="button" onClick={addStep} className="btn btn-info">+ Add Step</button>
          </div>

          <button type="submit" className="btn btn-danger w-100" style={{ marginTop: "40px" }}>Create Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
