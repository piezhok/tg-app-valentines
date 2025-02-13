<script setup>
import {computed, watch, ref} from "vue";
import {useStore} from "vuex";
import anonImg from "@/assets/anon.svg";
import {useRoute} from "vue-router";

const route = useRoute();
const store = useStore();
const lettersJson = ref()
watch(() => route.fullPath, (toPath) => {
    if (toPath == "/received") {
        lettersJson.value = store.state.received;
    } else if (toPath == "/sent") {
        lettersJson.value = store.state.sent;
    } else
        lettersJson.value = store.state.received;
    console.log("lettersJson", lettersJson.value);
})
// const lettersJson = computed(() => {
//     if (route.fullPath == "/received") {
//         return store.state.received;
//     } else if (route.fullPath == "/sent") {
//         return store.state.sent;
//     } return store.state.received;
// })
const usersJson = computed(() => {
    return store.state.users;
})
const lettersLength = computed(() => {
    return store.state.received.length;
})

const getUserValue = (letterslist, i, value) => {
    console.log(usersJson.value);
    const user = usersJson.value.find(user => user.id == letterslist[i].sender_telegram_id)
    console.log("user", user)
    return user[value];
}

const getAvatar = (letterslist, i) => {
    console.log("getAvatar", letterslist[i]["anonymous"]);
    if (letterslist[i]["anonymous"] === true) {
        return anonImg;
    } else {
        return getUserValue(letterslist, i, "photo_url");
    }
}

</script>

<template>
    <div class="inner list">
        <router-link v-for="n in lettersLength" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img :src="getAvatar(lettersJson, n-1)" alt="avatar">
            </div>
            <div class="sender-name">{{
                    `${getUserValue(lettersJson, n - 1, "first_name")} ${getUserValue(lettersJson, n - 1, "last_name")}`
                }}</div>
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