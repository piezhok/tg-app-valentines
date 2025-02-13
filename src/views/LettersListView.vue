<script setup>
import {computed, watch} from "vue";
import {useStore} from "vuex";
import anonImg from "@/assets/anon.svg";
import {useRoute} from "vue-router";

const route = useRoute();
const store = useStore();
// const lettersJson = ref()
const receivedJson = computed(() => {
    return store.state.received;
})
const sentJson = computed(() => {
    return store.state.sent;
})
const currentPage = computed(() => {
    return store.state.received
});
watch(() => route.fullPath, (toPath) => {
    if (toPath == "/received") {
        currentPage.value = receivedJson.value;
    } else if (toPath == "/sent") {
        currentPage.value = sentJson.value;
    }
})
const usersJson = computed(() => {
    return store.state.users;
})
const lettersLength = computed(() => {
    return currentPage.value.length;
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
                <img :src="getAvatar(currentPage, n-1)" alt="avatar">
            </div>
            <div class="sender-name">{{
                    `${getUserValue(currentPage, n - 1, "first_name")} ${getUserValue(currentPage, n - 1, "last_name")}`
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