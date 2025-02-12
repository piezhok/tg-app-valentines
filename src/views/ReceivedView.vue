<script setup>
import {computed} from "vue";
import {useStore} from "vuex";

const store = useStore();
const receivedJson = computed(() => {
    console.log("Received", store.state.received);
    return store.state.received;
})
const usersJson = computed(() => {
    console.log("Users", store.state.users);
    return store.state.users;
})

const getUserValue = (i, value) => {
    const user = usersJson.value.find(user => user.sender_telegram_id == receivedJson[i].sender_telegram_id)
    return user[value];
}

const getAvatar = (i) => {
    if (receivedJson[i].anonymous === true) {
        return "@/assets/anon.svg"
    } else {
        return getUserValue(i, "photo_url");
    }
}

</script>

<template>
    <div class="inner list">
        <router-link v-for="n in receivedJson.length" :key="'letter'+n" :to="'/received/'+n">
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