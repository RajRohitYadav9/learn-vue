<template>
  <div id="app">
    <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/location">Location</router-link></li>
    </ul>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.navbar {
  background-color: #333; /* Dark gray background color */
  padding: 10px;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  display: inline;
  margin-right: 10px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}

.navbar ul li a:hover {
  background-color: #555;
}
</style>