<script setup>
    import {useRoute} from "vue-router";

    const route = useRoute();

    if (route.fullPath === "/received") {
        console.log("щаща");
    }

    // const getList = async () => {
    // }
</script>

<template>
    <div class="inner list">
        <router-link v-for="n in receivedJson.length" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img src="" alt="avatar">
            </div>
            <div class="sender-name">{{ receivedJson[n-1].sender_telegram_id }}</div>
        </router-link>
    </div>
</template>

<style scoped lang="scss">

</style>