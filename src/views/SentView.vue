<script setup>
    import {onMounted} from "vue";

    async function getSmth() {
        const smth = await fetch("http://45.82.253.8:5000/api/cards/sent/", {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await smth.json();
        console.log(response);
        return response;
    }

    onMounted(() => {
        const test = getSmth();
        console.log(test);
    })
</script>

<template>
    <div>2</div>
</template>

<style scoped>

</style>