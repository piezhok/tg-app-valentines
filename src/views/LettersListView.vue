<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import anonImg from "@/assets/anon.svg";
import {useRoute} from "vue-router";

const route = useRoute();
const store = useStore();
// const lettersJson = ref()
// const receivedJson = computed(() => {
//     return store.state.received;
// })
// const sentJson = computed(() => {
//     return store.state.sent;
// })
const currentPage = computed(() => {
    if (route.fullPath == "/received") {
        return store.state.received;
    } else if (route.fullPath == "/sent") {
        return store.state.sent;
    } else return store.state.received;
});
// watch(() => route.fullPath, (toPath) => {
//     if (toPath == "/received") {
//         currentPage.value = store.state.received;
//     } else if (toPath == "/sent") {
//         currentPage.value = store.state.sent;
//     } console.log("currentPage", currentPage.value);
// })
const usersJson = computed(() => {
    return store.state.users;
})
const lettersLength = computed(() => {
    return currentPage.value.length;
})

const anotherPage = computed(() => {
    return store.state.sent;
});

const getAnotherId = (i) => {
    const userId = anotherPage.value.find(letter => letter["receiver_telegram_id"] == currentPage.value[i]["sender_telegram_id"])["sender_telegram_id"];
    return userId;
}

const getUserValue = (letterslist, i, value) => {
    if (route.fullPath == "/received") {
        return usersJson.value.find(user => user.id == letterslist[i].sender_telegram_id)[value];
    } else if (route.fullPath == "/sent") {
        return usersJson.value.find(user => user.id == letterslist[i].receiver_telegram_id)[value];
    }
    return usersJson.value.find(user => user.id == letterslist[i].sender_telegram_id)[value];
}

const avatarName = ref([]);

const getAvatar = (letterslist, i) => {
    if (route.fullPath == "/sent" || letterslist[i]["anonymous"] === false || getAnotherId(i) == currentPage.value[i]["sender_telegram_id"]) {
        if (getUserValue(letterslist, i, "photo_url") !== null) {
            avatarName.value[i] = null;
            return getUserValue(letterslist, i, "photo_url");
        }
        else if (getUserValue(letterslist, i, "photo_url") === null) {
            avatarName.value[i] = getUserValue(currentPage.value, i, "first_name")[0];
            return 0;
        }
    } else {
        return anonImg;
    }
}

const getName = (i) => {
    if (route.fullPath == "/sent" || currentPage.value[i]["anonymous"] === false || getAnotherId(i) == currentPage.value[i]["sender_telegram_id"]) {
        if (getUserValue(currentPage.value, i, "last_name") === null)
            return `${getUserValue(currentPage.value, i, "first_name")}`;
        else
            return `${getUserValue(currentPage.value, i, "first_name")} ${getUserValue(currentPage.value, i, "last_name")}`;
    } else {
        return "Аноним"
    }
}

</script>

<template>
    <div class="inner list">
        <router-link v-for="n in lettersLength" :key="'letter'+n" :to="`${$route.path}/${n}`">
            <div class="avatar">
                <img v-if="avatarName[n-1] == null" :src="getAvatar(currentPage, n-1)" alt="avatar">
                <span v-if="avatarName[n-1] != null">{{ avatarName[n-1] }}</span>
            </div>
            <div class="sender-name">{{ getName(n-1) }}
            </div>
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
    gap: 1rem;

    .avatar {
        width: 4.875rem;
        height: 4.875rem;
        background-color: #B1244A;
        border-radius: 100rem;

        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
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