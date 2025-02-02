<script setup>

</script>

<template>
    <nav class="nav-bar_container glass">
        <router-link to="/received">
            <img src="@/assets/navReceived.svg" alt="received">
        </router-link>
        <router-link to="/sent">
            <img src="@/assets/navSent.svg" alt="sent">
        </router-link>
        <router-link to="/new">
            <img src="@/assets/navNew.svg" alt="new">
        </router-link>
    </nav>
</template>

<style scoped>
    .nav-bar_container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 4rem;
        width: 100%;
        padding: .875rem 0;
        position: static;
        //bottom: 0;
        //right: 1rem;
        //left: 1rem;
    }

    a {
        height: 100%;
    }

    img {
        height: 100%;
    }
</style>