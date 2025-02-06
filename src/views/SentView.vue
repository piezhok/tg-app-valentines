<script setup>
    import {onMounted, ref} from "vue";

    // async function getSmth() {
    //     const smth = await fetch("http://45.82.253.8:5000/api/cards/sent/", {
    //         method: 'GET',
    //         mode: 'no-cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     const response = await smth.json();
    //     console.log(response);
    //     return response;
    // }

    const test = ref();
    onMounted(() => {
        test.value = window.Telegram.WebApp.initData;
        console.log(test.value);
    })
</script>

<template>
    <div>{{ test }}</div>
</template>

<style scoped>

</style>