<script setup>
import NavBar from "@/components/NavBar.vue";
import LettersWheel from "@/components/LettersWheel.vue";
import {useStore} from "vuex";
import {onBeforeMount} from "vue";

const store = useStore();
onBeforeMount(() => {
    store.dispatch("fetchReceived");
})
</script>

<template>
    <div class="main-card glass" :class="{list: $route.fullPath == '/received'}">
        <RouterView v-slot="{ Component }">
            <Transition :name="$route.meta.transition" mode="out-in">
<!--                 <KeepAlive>-->
<!--                <div style="height: fit-content" :key="$route.fullPath" >-->
                    <component :key="$route.fullPath" :is="Component"></component>
<!--                </div>-->
<!--                 </KeepAlive>-->
            </Transition>
        </RouterView>
    </div>
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

.list {
    margin: 1rem;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    transition: transform 0.4s ease;
}

.slide-right-enter-from,
.slide-left-leave-to {
    //position: absolute;
    transform: translateX(100%);
}

.slide-left-enter-from,
.slide-right-leave-to {
    //position: absolute;
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-leave-to,
.fade-enter-from {
    opacity: 0;
}
</style>
