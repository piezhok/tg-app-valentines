<script setup>
import NavBar from "@/components/NavBar.vue";
import LettersWheel from "@/components/LettersWheel.vue";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import axios from 'axios';

const store = useStore();

const initData = computed(() => {
    return store.state.initData;
})
const userInfo = computed(() => {
    return store.getters.userInfo;
})
const userData = ref({
    "telegram_id": userInfo.value.id,
    "telegram_init_data": initData.value,
    "public_key": "string"
})

async function postUser() {
    try {
        // const response = fetch("https://saharvnor.me:5000/api/users/", {
        //     method: "POST",
        //     mode: 'no-cors',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "accept": "application/json",
        //     },
        //     body: {
        //         "telegram_id": userData.value.telegram_id,
        //         "telegram_init_data": userData.value.telegram_init_data,
        //         "public_key": "string"
        //     },
        // })
        const response = await axios.post('https://saharvnor.me:5000/api/users/', userData.value, {
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            }
        });
        console.log("Response: " + response.statusText);
    } catch (error) {
        console.error('Error submitting form', error);
    }
}
if (window.Telegram.WebApp.CloudStorage.getItem("id") == undefined) {
    await postUser()
    window.Telegram.WebApp.CloudStorage.setItem("id", userInfo.value.id);
}

// const passPhrase = ref()
onMounted(() => {
    // console.log(userData.value);
    console.log(initData.value);
    // postUser();

    // initData.value = window.Telegram.WebApp.initData;
    // console.log(window.Telegram.WebApp.initData)
    // const temp = "user=%7B%22id%22%3A404535053%2C%22first_name%22%3A%22%D1%8D%D1%82%D0%BE%20%D0%BD%D0%B5%20%D0%BF%D0%B8%D1%80%D0%BE%D0%B3%E2%81%B4%C2%B2%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22piezhok%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FVvqVW87n5WkdJX8uzHL6O8EhVGnWgsrthtTX3YosfQM.svg%22%7D&chat_instance=8787168753902846877&chat_type=private&auth_date=1738859307&signature=fGWpwSYIQ0KLXhxO7nA8KoOt7ms1Y5-CPGnSVdVuQvfdRcRGDLL4KG7eWALkv9egB4Ni7heLoigevFsYIHrIAQ&hash=a1dd914b90a7b78eabbff79ff99a6dc214668c658926c5d37a604490ae6bf69a"
    // passPhrase.value = decodeURIComponent(temp).split("hash=")[1];
    // passPhrase.value = decodeURIComponent(initData.value).split("hash=")[1];
    // const closedKey = cryptico.generateRSAKey(passPhrase.value, 1024);
    // const openedKey = cryptico.publicKeyString(closedKey);
    // console.log(passPhrase.value);
})

// onBeforeMount(() => {
//     store.dispatch("fetchReceived");
// })
store.dispatch("fetchReceived");
const quantity = computed( () => {
    return store.state.received.length
});
</script>

<template>
    <div class="quantity-title">
        <div>{{ quantity }}</div>
        <div>Валентинок</div>
    </div>
    <div class="main-card glass" :class="{'list-container': $route.fullPath == '/received'||$route.fullPath == '/sent'}">
        <RouterView v-slot="{ Component }">
            <Transition :name="$route.meta.transition" mode="out-in">
                 <KeepAlive>
                    <component :key="$route.fullPath" :is="Component"></component>
                 </KeepAlive>
            </Transition>
        </RouterView>
    </div>
    <LettersWheel />
    <NavBar />

<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.quantity-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Helvetica;
    font-size: .875rem;
    font-weight: 800;
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    //position: absolute;
    //top: 1.375rem;
    :first-child {
        font-size: 7.25rem;
    }
    :last-child {
        margin-top: -0.75rem;
    }
}

.list-container {
    margin-bottom: 1rem;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    transition: transform 0.4s ease;
}

.slide-right-enter-from,
.slide-left-leave-to {
    //position: absolute;
    transform: translateX(100%);
}

.slide-left-enter-from,
.slide-right-leave-to {
    //position: absolute;
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-leave-to,
.fade-enter-from {
    opacity: 0;
}
</style>
