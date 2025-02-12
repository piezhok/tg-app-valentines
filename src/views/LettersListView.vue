<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
// import {useRoute} from "vue-router";

// const route = useRoute();
const store = useStore();
// const listJson = computed(() => {
//     return store.state.received;
// })
// const usersJson = computed(() => {
//     return store.state.users;
// })

const receivedJson = ref();
const sentJson = ref();
const usersJson = ref()

onMounted(async () => {
    receivedJson.value = await store.state.received;
    sentJson.value = await store.state.sent;
    usersJson.value = await store.state.users;
})

const getUserValue = (letterslist, i, value) => {
    const user = usersJson.value.find(user => user.sender_telegram_id == letterslist[i].sender_telegram_id)
    return user[value];
}

const getAvatar = (letterslist, i) => {
    if (letterslist[i]["anonymous"] === true) {
        return "@/assets/anon.svg";
    } else {
        return getUserValue(letterslist, i, "photo_url");
    }
}

</script>

<template>
    <div class="inner list">
        <router-link v-for="n in receivedJson.length" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img :src="getAvatar(receivedJson, n)" alt="avatar">
            </div>
            <div class="sender-name">{{ `${getUserValue(receivedJson, n-1, "first_name")} ${getUserValue(receivedJson, n-1, "last_name")}` }}</div>
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