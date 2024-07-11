<template>
    <div id="map" style="height: 500px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import "leaflet/dist/leaflet.css";
  import * as L from 'leaflet';
  
  const initialMap = ref(null);
  
  onMounted(async () => {
    initialMap.value = L.map('map').setView([0, 0], 2);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(initialMap.value);
  
    // Fetch user data
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
  
      users.forEach(user => {
        const { name, address: { geo: { lat, lng } } } = user;
        L.marker([parseFloat(lat), parseFloat(lng)])
          .addTo(initialMap.value)
          .bindPopup(name);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
  </script>
  
  <style scoped>
  #map {
    width: 100%;
  }
  </style>
  