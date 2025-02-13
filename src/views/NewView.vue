<script setup>
import axios from 'axios';
import {ref} from "vue";
import {useRouter} from "vue-router";
const addAt = (event) => {
    const input = event.target;
    const fixedText = "@";

    if (!input.value.startsWith(fixedText)) {
        input.value = fixedText;
    }
}

const router = useRouter();
// const initData = computed(() => {
//     return store.state.initData;
// })
// const userInfo = computed(() => {
//     return store.getters.userInfo;
// })
// const initData = ref();
// const userInfo = ref();
// const senderId = ref();


// const formData = ref({
//     telegram_init_data: initData,
//     sender_telegram_id: userId,
//     receiver_telegram_id: 488687700,
//     message: "",
//     created_at: 0,
//     anonymous: true
// });
// onMounted(async () => {
//     const initData = await window.Telegram.WebApp.initData;
//     const params = new URLSearchParams(initData);
//     const userId = JSON.parse(params.get("user")).id;
// })

const removeAt = (event) => {
    const input = event.target;

    if (input.value === "@") {
        input.value = "";
    }
}
const receiverId = ref();
const message = ref();
const anonymous = ref(true);

async function submitForm() {
    try {
        const response = await axios.post('https://saharvnor.me:5000/api/cards', {
            "telegram_init_data": await window.Telegram.WebApp.initData,
            "sender_telegram_id":  JSON.parse(new URLSearchParams(await window.Telegram.WebApp.initData).get("user")).id,
            "receiver_telegram_username": receiverId.value.replaceAll("@", ""),
            "message": message.value,
            "created_at": Math.floor(new Date().getTime()/1000),
            "anonymous": anonymous.value,
            "color": 0,
            "background_emoji": 0
        }, {
            mode: 'no-cors',
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        });
        router.to = "/sent";
        console.log('Form submitted successfully', response);
    } catch (error) {
        console.error('Error submitting form', error);
    }
}
</script>

<template>
    <form @submit.prevent="submitForm" class="inner">
        <div class="contacts-container">
            <div class="input-box from">
                <label for="from-input">От&nbsp;&nbsp;</label>
                <input type="text" value="Аноним" disabled id="from-input">
                <span>ⓘ</span>
            </div>
            <div class="input-box to">
                <label for="to-input">Кому</label>
                <input v-model="receiverId" type="text" id="to-input" required placeholder="@username" autocorrect="off" autocapitalize="off" spellcheck="false" @focus="addAt" @input="addAt" @blur="removeAt"/>
            </div>
        </div>
        <textarea v-model="message" wrap="hard" class="message-box" required></textarea>
        <div class="control-container">
            <div class="anon-radio_container">
                <div class="anon-radio">
                    <input type="radio" id="anon1" name="anonymous" v-model="anonymous" value=true>
                    <label for="anon1">Анонимно</label>
                </div>
                <div class="anon-radio">
                    <input type="radio" id="anon2" name="anonymous" v-model="anonymous" value=false>
                    <label for="anon2">Открыто</label>
                </div>
                <div class="anon-radio">
                    <input type="radio" id="anon3" name="anonymous" v-model="anonymous" value="" disabled>
                    <label for="anon3">Тайно</label>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <button type="submit">Отправить</button>
<!--            <label for="send-btn">Отправить</label>-->
        </div>
    </form>
</template>

<style scoped lang="scss">
    .inner {
        z-index: 2;
    }

    .contacts-container {
        //div {
        //    width: 100%;
        //}

        label {
            width: 3rem;
            text-align: start;
            color: var(--secondary-text);
        }


        input[type=text] {
            width: 100%;
            text-align: start;
        }
        .input-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: left;
            padding: .75rem 0;
            gap: 1rem;
            position: relative;
            //justify-content: space-between;
        }

        .input-box::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: .05rem;
            background-color: var(--secondary-stroke-color);
        }

        .from {
            padding-top: 0;
        }
    }

    textarea {
        all: unset;
        width: 100%;
        height: 100%;
        flex-grow: 1;
        text-align: start;
        resize: none;
        overflow-wrap: break-word;
        white-space: pre-wrap;
    }

    .anon-radio_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: .75rem;

        .anon-radio {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-grow: 1;
            input[type="radio"] {
                -webkit-appearance: none;
                appearance: none;
            }
            label {
                flex-grow: 1;
                box-sizing: border-box;
                padding: .25rem .625rem;
                border: .05rem solid var(--secondary-stroke-color);
                border-radius: 1.875rem;
                transition: all .2s ease-in-out;
            }
            input[type="radio"]:checked+label {
                border: .05rem solid var(--accent-color);

            }
            input[type="radio"]:disabled+label {
                color: var(--secondary-text);
            }
        }
    }

    .btn-container {
        color: var(--accent-color);
    }
</style>
