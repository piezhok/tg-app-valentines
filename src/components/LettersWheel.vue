<script setup>
import {ref, watch, computed, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

let startElements = ref([]);
const quantity = ref(0);
const currentLetter = ref(0);
const lowestLetter = ref(2);
const lowestLetterNum = ref();
const rotation = ref(0);
const opacity = ref(0);
let angle = 0;
let temp = 0;
const isDragging = ref(false);

// const props = defineProps(['type']);    // received || sent
const route = useRoute();
const router = useRouter();
const store = useStore();
const state = computed(() => {
    return store.state;
})
const json = ref();
watch(() => route.fullPath, (toPath, fromPath) => {
    const to = String(toPath);
    const from = String(fromPath);
    if (to.split("/")[2] == undefined && from.split("/")[2] != undefined) {
        rotation.value = 0;
        currentLetter.value = 0;
        lowestLetter.value = 2;
    } else if (to.split("/")[2] != undefined) {
        const type = to.split("/")[1];
        const id = parseInt(to.split("/")[2]);

        if (from.split("/")[2] == undefined) {           // from list to letter
            // rotation.value = 0;
            // currentLetter.value = 0;
            // lowestLetter.value = 2;
            json.value = type == 'received'?state.value.received:state.value.sent;
            quantity.value = json.value.length ? json.value.length : 0;
            const idIndex = json.value.findIndex(letter => letter.id == id);
            startElements.value = [];
            for (let i = 0; i < 4; i++) {
                if (i === 3) {
                    if (idIndex-1 <= 0)
                        startElements.value.push(quantity.value-1);
                    else
                        startElements.value.push((idIndex-1) % quantity.value)
                } else
                    startElements.value.push((idIndex+i) % quantity.value);
            }
            lowestLetterNum.value = startElements.value[2];
        }
        // const idIndex = json.value.indexOf(id);
    }
}, { immediate: true })

onMounted(() => {
})
// watch(() => route.path, () => {
//     currentLetter.value = parseInt(route.state.id)-1;
// });
// onBeforeRouteUpdate((to) => {
//     currentLetter.value = parseInt(to.path)-1;
//     console.log(currentLetter.value);
// });
const subtractNum = (n, k = (quantity.value > 0 && quantity.value <= 2 ? quantity.value : 4)) => {
    n -= 1;
    if (n < 0) {
        n = k-1;
    }
    return n;
}
const addNum = (n, k = (quantity.value > 0 && quantity.value <= 2 ? quantity.value : 4)) => {
    return n = (n+1) % (k);
}
const rotateWheel = (isToNext = true) => {
    if (isToNext) {
        // currentLetter.value -= 1;
        // if (currentLetter.value < 0) {
        //     currentLetter.value = 3;
        // }
        router.push(`/received/${addNum(parseInt(route.params.id), quantity.value)}`);
        currentLetter.value = addNum(currentLetter.value);
        lowestLetterNum.value = addNum(startElements.value[currentLetter.value], quantity.value);
        startElements.value.splice(lowestLetter.value, 1, lowestLetterNum.value);
        console.log(startElements.value);
        lowestLetter.value = addNum(lowestLetter.value);
        rotation.value -= temp;
        rotation.value += -90;
    } else {
        router.push(`/received/${subtractNum(parseInt(route.params.id), quantity.value)}`);
        currentLetter.value = subtractNum(currentLetter.value);
        lowestLetterNum.value = subtractNum(startElements.value[currentLetter.value], quantity.value);
        startElements.value.splice(lowestLetter.value, 1, lowestLetterNum.value);
        lowestLetter.value = subtractNum(lowestLetter.value);
        console.log(startElements.value);
        if (lowestLetterNum.value < 0) {
            lowestLetterNum.value = quantity.value-1;
        }
        rotation.value -= temp;
        rotation.value += 90;
    }
    opacity.value = 0;
    temp = 0
}

let touchStartX = 0;
let mouseStartX = 0;

const getAngle = (diff) => (Math.atan(diff / 200) * (180/Math.PI) * 1.2);
const moveIt = (diff) => {
    if (Math.abs(diff) < 10) return;
    angle = getAngle(diff);
    if (Math.abs(angle) > 45) return;
    rotation.value -= temp;
    temp = angle;
    rotation.value += angle;
    opacity.value = Math.abs(angle)/100;
}

const touchStart = (event) => {
    touchStartX = event.touches[0].clientX;
    isDragging.value = true;
};
const touchMove = (event) => {
    // let diffX = event.touches[0].clientX - touchStartX;
    if (!isDragging.value) return;
    let diffX = event.touches[0].clientX - touchStartX;
    moveIt(diffX);
};
const touchEnd = (event) => {
    isDragging.value = false;
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 50) {
        rotateWheel(false);
    } else if (diffX < -50) {
        rotateWheel();
    } else {
        rotation.value -= temp;
        temp = 0;
    }
};

const mouseDown = (event) => {
    mouseStartX = event.clientX;
    isDragging.value = true;
};
const mouseMove = (event) => {
    if (!isDragging.value) return;
    let diffX = event.clientX - mouseStartX;
    moveIt(diffX);
}
requestAnimationFrame(mouseMove);
const mouseUp = (event) => {
    if (!isDragging.value) return;
    isDragging.value = false;
    const diffX = event.clientX - mouseStartX;
    if (diffX > 50) {
        rotateWheel(false);
    } else if (diffX < -50) {
        rotateWheel();
    } else {
        rotation.value -= temp;
        temp = 0;
    }
};

// const changeNum = (n) => computed(() => {
//     return lowestLetter.value+1 != n ? startElements[n - 1] + 1 : lowestLetterNum.value+1;
// })
</script>

<template>
    <div class="wheel_container" :class="{mini: $route.path == '/received'}">
        <div class="wheel_wrapper" :style="{transform: `rotate(${rotation}deg)`}"
             @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
             @touchcancel="touchEnd"
             @mousedown="mouseDown" @mouseup="mouseUp"
             @mousemove="mouseMove" @mouseleave="mouseUp">
            <div v-for="n in 4" class="letter_container" :data-index="n" :key="n" :style="{opacity: h = lowestLetter+1 == n?opacity:100}">
                <img src="@/assets/heart.svg" :alt="n">
                <div class="avatars_container">
                    <div class="avatar_box sender-avatar">
                        <img src="@/assets/anon.svg" alt="">
                    </div>
                    <div class="avatar_box receiver-avatar">
                        <img src="@/assets/anon.svg">
                    </div>
                </div>
                <div class="letter-number_box">
<!--                    {{ lowestLetter.value+1 != n ? startElements[n - 1] + 1 : changeNum(n) }}-->
                    {{ startElements[n - 1] + 1 }}
                </div>
            </div>
<!--            <div class="letter_container" data-index="2">-->
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wheel_container {
        position: fixed;
        //overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        //position: relative;
        width: 37.5rem;
        max-width: 100vw;
        height: 37.5rem;
        //transform: translateY(19.75rem);
        //transform: translateY(19.5rem);
        transform: translateY(16rem);
        transition: transform 0.5s ease;
        //margin-top: 19.5rem;
        * {
            transition: all 0.5s;
        }
    }

    .wheel_wrapper {
        //position: absolute;
        transition: transform .5s;
        width: 100%;
        max-width: 100vw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .letter_container:nth-child(1) {
        transform: rotate(0deg) translateY(calc(-8.75rem));
    }
    .letter_container:nth-child(2) {
        transform: rotate(90deg) translateY(calc(-8.75rem));
    }
    .letter_container:nth-child(3) {
        transform: rotate(180deg) translateY(calc(-8.75rem));
    }
    .letter_container:nth-child(4) {
        transform: rotate(270deg) translateY(calc(-8.75rem));
    }

    .letter_container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        //object-fit: cover;
        z-index: -1;
        //width: 60%;
        width: 16.25rem;
        height: 13.75rem;
        //height: 100%;
        //height: 18.75rem;
        position: absolute;
        transition: all .5s;
    }

    .hidden {
        opacity: 0;
    }

    .letter_container>img {
        position: absolute;
        object-fit: contain;
        width: 100%;
        z-index: -1;
    }

    .avatars_container {
        display: flex;
        justify-content: center;
        transform: translateY(1.2rem);
        //align-items: center;
        gap: 1.375rem;
        height: fit-content;
    }

    .avatar_box {
        width: 6.25rem;
        //width: 9rem;
        //height: 9rem;
    }

    .avatar_box>img {
        width: 100%;
        height: 100%;
    }

    .letter-number_box {
        //width: 2.8125rem;
        //height: 2.8125rem;
        //position: relative;
        font-size: 1.25rem;
        position: absolute;
        bottom: .375rem;
        color: #FC6F95;
        transition: opacity .5s !important;
        //justify-self: bottom;
    }

    .wheel-navigation_container {
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        //gap: 10rem;
        //transform: translateY(-8rem);
        gap: 5.5rem;
        transform: translateY(-5rem);
    }

    .arrow-btn_box {
        //width: 2.8125rem;
        //height: 2.8125rem;
    }

    .arrow-btn_box>img {
        width: 100%;
        height: 100%;
    }

    .mini {
        //width: 4rem;
        //height: 4rem;
        transform: translateY(16rem) scale(30%);
        //.wheel_wrapper {
            //transform: rotate(0deg);
        //}
        .wheel_wrapper {
            //transition: none;
            .letter_container:not(:nth-child(1)) {
                opacity: 0 !important;
            }
        }

        .letter_container {
            :not(img) {
                opacity: 0;
            }
        }


        //.letter_container :not(:nth-child(1)) {
        //    opacity: 0;
        //}
    }
</style>