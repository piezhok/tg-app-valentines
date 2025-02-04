<script setup>
import {computed} from "vue";
import {useStore} from "vuex";


const store = useStore();
const receivedJson = computed(() => {
    return store.state.received;
})

</script>

<template>
    <div class="">
        <router-link v-for="n in receivedJson.length" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img src="" alt="avatar">
            </div>
            <div class="sender-name">{{ receivedJson[n-1].sender_telegram_id }}</div>
        </router-link>
    </div>
</template>

<style scoped>
    .svg-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(2rem);}

    svg {
        width: 4rem;
    }
    .main-card {
        margin: 1rem;
    }

    a {
        all: unset;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;

        .avatar {
            width: 4.875rem;
            height: 4.875rem;
            background-color: #B1244A;
            border-radius: 100rem;
        }
    }
</style>