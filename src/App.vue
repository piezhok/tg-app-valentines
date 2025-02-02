<script setup>
import LetterInfo from "@/components/LetterInfo.vue";
import LettersWheel from "@/components/LettersWheel.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
    <LetterInfo></LetterInfo>
    <LettersWheel />
    <NavBar />

<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
