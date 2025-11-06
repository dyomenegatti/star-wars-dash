<template>
  <div id="app">
    <nav>
      <div @click="handleLogoClick" class="logo-wrapper">
        <img src="@/assets/images/star-wars.svg" alt="Star Wars logo">
      </div>
    </nav>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleLogoClick() {
      this.$root.$emit('reset-to-carousel');
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Poppins", sans-serif;
  background: #181818;
  color: #c9c9c9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

nav {
  display: flex;
  justify-content: center;
  padding-top: 20px;

  .logo-wrapper {
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  img {
    width: 6rem;
  }
}

.content {
  flex: 1; 
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding: 2rem;
}
</style>
