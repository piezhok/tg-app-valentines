<script setup>
    import {onMounted, ref} from "vue";

    async function getSmth() {
        const smth = await fetch("http://45.82.253.8:5000/api/cards", {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            telegram_hash: "user=%7B%22id%22%3A404535053%2C%22first_name%22%3A%22%D1%8D%D1%82%D0%BE%20%D0%BD%D0%B5%20%D0%BF%D0%B8%D1%80%D0%BE%D0%B3%E2%81%B4%C2%B2%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22piezhok%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FVvqVW87n5WkdJX8uzHL6O8EhVGnWgsrthtTX3YosfQM.svg%22%7D&chat_instance=8787168753902846877&chat_type=private&auth_date=1738859307&signature=fGWpwSYIQ0KLXhxO7nA8KoOt7ms1Y5-CPGnSVdVuQvfdRcRGDLL4KG7eWALkv9egB4Ni7heLoigevFsYIHrIAQ&hash=a1dd914b90a7b78eabbff79ff99a6dc214668c658926c5d37a604490ae6bf69a",
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
        console.log(initData.value.split("hash=")[1]);
        test.value = getSmth();
        console.log(test.value);
    })
</script>

<template>
    <div>{{ test }}</div>
</template>

<style scoped>

</style>