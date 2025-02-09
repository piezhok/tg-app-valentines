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
// const initData = ref();
// const userInfo = ref();
// const senderId = ref();

const formData = ref({
    telegram_init_data: "user=%7B%22id%22%3A404535053%2C%22first_name%22%3A%22%D1%8D%D1%82%D0%BE%20%D0%BD%D0%B5%20%D0%BF%D0%B8%D1%80%D0%BE%D0%B3%E2%81%B4%C2%B2%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22piezhok%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FVvqVW87n5WkdJX8uzHL6O8EhVGnWgsrthtTX3YosfQM.svg%22%7D&chat_instance=8787168753902846877&chat_type=private&auth_date=1738859307&signature=fGWpwSYIQ0KLXhxO7nA8KoOt7ms1Y5-CPGnSVdVuQvfdRcRGDLL4KG7eWALkv9egB4Ni7heLoigevFsYIHrIAQ&hash=a1dd914b90a7b78eabbff79ff99a6dc214668c658926c5d37a604490ae6bf69a",
    sender_telegram_id: 404535053,
    receiver_telegram_id: 488687700,
    message: "",
    created_at: 0,
    anonymous: true
});
// onMounted(() => {
//     initData.value = window.Telegram.WebApp.initData;
//     let decodedTemp = decodeURIComponent(initData.value).replace("user=", "").split("&")[0];
//     console.log(decodedTemp);
//     userInfo.value = JSON.parse(decodedTemp);
//     senderId.value = userInfo.value.id;
//     formData.value.telegram_init_data = initData.value;
//     formData.value.sender_telegram_id = senderId.value;
// })

const removeAt = (event) => {
    const input = event.target;

    if (input.value === "@") {
        input.value = "";
    }
}

async function submitForm() {
    try {
        const response = await axios.post('http://45.82.253.8:5000/api/cards', formData.value);
        console.log('Form submitted successfully', response);
        router.to = "/sent";
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
                <input type="text" id="to-input" required placeholder="@username" autocorrect="off" autocapitalize="off" spellcheck="false" @focus="addAt" @input="addAt" @blur="removeAt"/>
            </div>
        </div>
        <textarea v-model="formData.message" wrap="hard" class="message-box" required></textarea>
        <div class="control-container">
            <div class="anon-radio_container">
                <div class="anon-radio">
                    <input type="radio" id="anon1" name="anonymous" v-model="formData.anonymous" value=true>
                    <label for="anon1">Анонимно</label>
                </div>
                <div class="anon-radio">
                    <input type="radio" id="anon2" name="anonymous" v-model="formData.anonymous" value=false>
                    <label for="anon2">Открыто</label>
                </div>
                <div class="anon-radio">
                    <input type="radio" id="anon3" name="anonymous" v-model="formData.anonymous" value="" disabled>
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
