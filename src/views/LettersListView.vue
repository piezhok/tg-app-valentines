<script setup>
import {ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const route = useRoute();
const store = useStore();
// const listJson = computed(() => {
//     console.log("Received", store.state.received[0]);
//     return store.state.received;
// })
// const usersJson = computed(() => {
//     console.log("Users", store.state.users);
//     return store.state.users;
// })
const listJson = ref();
const usersJson = ref();

const getUserValue = async (i, value) => {
    const user = await usersJson.value.find(async user => await user.sender_telegram_id == await listJson[i].sender_telegram_id)
    return user[value];
}

const getAvatar = async (i) => {
    if (listJson[i].anonymous === true) {
        return "@/assets/anon.svg";
    } else {
        return await getUserValue(i, "photo_url");
    }
}

watch(() => route.fullPath, (toPath) => {
    if (toPath == "/received") {
        listJson.value = store.state.received;
    } else if (toPath == "/sent") {
        listJson.value = store.state.sent;
    }
    usersJson.value = store.state.users;
}, { immediate: true });
</script>

<template>
    <div class="inner list">
        <router-link v-for="n in listJson.length" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img :src="getAvatar(n)" alt="avatar">
            </div>
            <div class="sender-name">{{ `${getUserValue(n-1, "first_name")} ${getUserValue(n-1, "last_name")}` }}</div>
        </router-link>
    </div>
</template>

<style scoped>
.inner {
    margin: 0 1rem !important;
}

a {
    all: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    margin: 1.5rem 0;
    position: relative;

    .avatar {
        width: 4.875rem;
        height: 4.875rem;
        background-color: #B1244A;
        border-radius: 100rem;
    }
}

a::after {
    content: "";
    display: block;
    width: 100%;
    height: .05rem;
    background-color: var(--secondary-stroke-color);
    position: absolute;
    bottom: -1.5rem;
}
</style>