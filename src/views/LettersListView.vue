<script setup>
import {watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const route = useRoute();
const store = useStore();
// const listJson = computed(() => {
//     return store.state.received;
// })
// const usersJson = computed(() => {
//     return store.state.users;
// })

const listJson = ref();
const usersJson = ref();

watch(() => route.fullPath, (toPath) => {
    if (toPath == "/received") {
        listJson.value = store.state.received;
        console.log(listJson.value);
    } else if (toPath == "/sent") {
        listJson.value = store.state.sent;
    }
    usersJson.value = store.state.users;
}, { immediate: true });


const getUserValue = computed(() => {
    return (object, i, value) => {
        if (!listJson.value[i]) return null;
        const user = object.value.find(user => user.sender_telegram_id == listJson.value[i].sender_telegram_id)
        return user[value];
    }
})

const getAvatar = computed(() => {
    return (object, i) => {
        if (!listJson.value[i]) return "@/assets/anon.svg";
        if (listJson.value[i]["anonymous"] === true) {
            return "@/assets/anon.svg";
        } else {
            return getUserValue(object, i, "photo_url");
        }
    }
})

</script>

<template>
    <div class="inner list">
        <router-link v-for="n in listJson.length" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img :src="getAvatar(usersJson, n)" alt="avatar">
            </div>
            <div class="sender-name">{{ `${getUserValue(usersJson, n-1, "first_name")} ${getUserValue(usersJson, n-1, "last_name")}` }}</div>
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