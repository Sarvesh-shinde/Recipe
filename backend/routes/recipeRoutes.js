const express = require("express");
const router = express.Router();
const recipeController = require("../routes/recipeController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // Multer middleware for Cloudinary uploads

// ✅ Fixed: Keep only one POST /create route
router.post("/create", protect, upload.single("image"), recipeController.createRecipe);

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get a single recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Update a recipe by ID (protected)
router.put("/:id", protect, upload.single("image"), recipeController.updateRecipe);

// Delete a recipe by ID (protected)
router.delete("/:id", protect, recipeController.deleteRecipe);

module.exports = router;
