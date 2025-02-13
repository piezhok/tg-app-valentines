<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

const route = useRoute();
const store = useStore();
const usersJson = computed(() => {
    return store.state.users;
})
const currentPage = computed(() => {
    if (route.fullPath == "/received") {
        return store.state.received;
    } else if (route.fullPath == "/sent") {
        return store.state.sent;
    } else return store.state.received;
});
const anotherPage = computed(() => {
    return store.state.sent;
});

const getAnotherId = (i) => {
    const userId = anotherPage.value.find(letter => letter["receiver_telegram_id"] == currentPage.value[i]["sender_telegram_id"])["receiver_telegram_id"];
    return userId;
}

const getUserValue = (letterslist, i, value) => {
    const user = usersJson.value.find(user => user.id == letterslist[i].sender_telegram_id);
    return user[value];
}

const getName = (i) => {
    if (getAnotherId(i) == currentPage.value[i]["sender_telegram_id"]) {
        return `${getUserValue(currentPage.value, i, "first_name")} ${getUserValue(currentPage.value, i, "last_name")}`;
    } else {
        return "Аноним"
    }
}
</script>

<template>
    <div class="inner">
        <div class="header">
            <router-link to="/received" class="back-button">
                <span>&lt;</span>
            </router-link>
            <div class="username">{{ getName($route.params.id-1) }}</div>
            <div class="delete-button">
                <span>🗑</span>
            </div>
        </div>
        <div class="content">
            {{ n }}
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: flex-start; /* Changed from space-between to flex-start */
    align-items: center;
    gap: 16px; /* Added gap between header items */
    position: relative;
}

.header::after {
    content: "";
    display: block;
    height: .0625rem;
    margin: 0 1rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(68, 68, 68);
}

.back-button, .delete-button {
    cursor: pointer;
    opacity: 0.7;
}

.username {
    font-weight: 500;
}

.content {
    //padding: 16px;
    flex-grow: 1;
}
</style>