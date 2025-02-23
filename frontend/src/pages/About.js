import React from "react";

function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Recipe Hub</h1>
      <p style={styles.text}>
        Welcome to <strong>Recipe Hub</strong> – your ultimate destination for discovering, sharing, and enjoying delicious recipes from around the world. Whether you're a seasoned chef or a home cook looking for inspiration, we bring you a curated collection of mouthwatering dishes that are easy to follow and fun to make.
      </p>

      <h2 style={styles.subtitle}>Our Mission</h2>
      <p style={styles.text}>
        At Recipe Hub, we believe that cooking is more than just preparing food – it's an experience that brings people together. Our mission is to empower food lovers with:
      </p>
      <ul style={styles.list}>
        <li>✅ A diverse range of recipes for every taste and dietary preference.</li>
        <li>✅ Easy-to-follow instructions that make cooking fun and stress-free.</li>
        <li>✅ A community where passionate cooks can share their culinary creativity.</li>
      </ul>

      <h2 style={styles.subtitle}>What We Offer</h2>
      <ul style={styles.list}>
        <li>🍽 <strong>Wide Variety of Recipes</strong> – From comforting classics to exciting new dishes, our library has something for everyone.</li>
        <li>🌱 <strong>Dietary Options</strong> – Explore vegetarian, vegan, gluten-free, and healthy alternatives tailored to your needs.</li>
        <li>📝 <strong>Step-by-Step Guides</strong> – Simple, clear, and easy-to-follow instructions for every skill level.</li>
        <li>❤️ <strong>Community Engagement</strong> – Share your favorite recipes, leave reviews, and connect with other food enthusiasts.</li>
      </ul>

      <h2 style={styles.subtitle}>Join Our Community</h2>
      <p style={styles.text}>
        Whether you’re looking for a quick meal, a special dessert, or a festive feast, Recipe Hub is here to make your culinary journey exciting and enjoyable. Join us today, explore new flavors, and let’s make cooking an adventure!
      </p>

      <p style={styles.contact}><strong>📩 Get in Touch:</strong> Have a question or suggestion? Contact us at <a href="mailto:support@recipehub.com">support@recipehub.com</a></p>
    </div>
  );
}

// Styles
const styles = {
  container: {
    width: "80%",
    margin: "auto",
    padding: "40px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  list: {
    textAlign: "left",
    fontSize: "18px",
    lineHeight: "1.8",
    paddingLeft: "20px",
  },
  contact: {
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default About;