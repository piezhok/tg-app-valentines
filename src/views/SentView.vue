<script setup>
    import {onMounted, ref} from "vue";

    async function getSmth() {
        const smth = await fetch("http://45.82.253.8:5000/api/cards", {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            telegram_hash: "a1dd914b90a7b78eabbff79ff99a6dc214668c658926c5d37a604490ae6bf69a",
            user_id: 404535053
        });
        const response = await smth.json();
        console.log(response);
        return response;
    }

    const initData = ref();
    const test = ref();
    onMounted(() => {
        initData.value = window.Telegram.WebApp.initData;
        console.log(initData.value);
        console.log(initData.value.split("hash")[1]);
        test.value = getSmth();
        console.log(test.value);
    })
</script>

<template>
    <div>{{ test }}</div>
</template>

<style scoped>

</style>