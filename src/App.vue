<!-- src/App.vue -->

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/login">Login</router-link>
        <router-link to="/users">Users</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// Import all of Bootstrap's CSS
export default defineComponent({
  name: 'App'
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
.card {
  min-height: 230px;
}
</style>
