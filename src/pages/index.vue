<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section class="hero">
      <div class="container text-center">
        <h1>Discover Amazing Places</h1>
        <p>Find companies, tours, and experiences around the world.</p>
        <NuxtLink to="/auth/register" class="btn">Get Started</NuxtLink>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <h2>About Yellow Book</h2>
        <p>
          Yellow Book is your go-to platform for discovering amazing tourism experiences.
          Explore companies, read reviews, and plan your next adventure.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>



<style scoped>
.hero {
  padding: 100px 0;
  background-color: #f0f8ff;
}
.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}
.hero p {
  font-size: 20px;
  margin-bottom: 30px;
}
.about {
  padding: 60px 0;
  background-color: #ffffff;
}
.about h2 {
  font-size: 36px;
  margin-bottom: 15px;
}
.about p {
  font-size: 18px;
  color: #555;
}
.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}
.btn:hover {
  background-color: #0056b3;
}
</style>
