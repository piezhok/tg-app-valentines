<script setup>
import {computed} from "vue";
import {useStore} from "vuex";


const store = useStore();
const receivedJson = computed(() => {
    return store.state.received;
})

</script>

<template>
    <div class="inner list">
        <router-link v-for="n in receivedJson.length" :key="'letter'+n" :to="'/received/'+n">
            <div class="avatar">
                <img src="" alt="avatar">
            </div>
            <div class="sender-name">{{ receivedJson[n-1].sender_telegram_id }}</div>
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