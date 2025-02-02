<script setup>
import {ref} from "vue";

const lowestLetter = ref(2);
const rotation = ref(0);
const opacity = ref(0);
let angle = 0;
let temp = 0;
const isDragging = ref(false);

const rotateWheel = (isToNext = true) => {
    if (isToNext) {
        lowestLetter.value = (lowestLetter.value+1)%4;
        rotation.value -= temp;
        rotation.value += -90;
    } else {
        lowestLetter.value = (lowestLetter.value-1)%4;
        if (lowestLetter.value < 0) {
            lowestLetter.value = 3;
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
    // if (Math.abs(diffX) < 20) return;
    // rotation.value -= temp;
    // angle = getAngle(diffX);
    // temp = angle;
    // rotation.value += angle;
    // opacity.value = Math.abs(angle)/100;
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
    // if (Math.abs(diffX) < 20) return;
    // angle = getAngle(diffX);
    // if (Math.abs(angle) > 45) return;
    // rotation.value -= temp;
    // temp = angle;
    // if (Math.floor(angle)%10 === 0) {
    //     console.log(angle);
    // }
    // rotation.value += angle;
    // opacity.value = Math.abs(angle)/100;
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
</script>

<template>
    <div class="wheel_container">
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
                    {{ n }}
                </div>
            </div>
<!--            <div class="letter_container" data-index="2">-->
        </div>
            <div class="wheel-navigation_container">
                <div class="arrow-btn_box to-left" @click="rotateWheel(false)">
                    <img src="@/assets/arrow-left.svg" alt="<">
                </div>
                <div class="arrow-btn_box to-right" @click="rotateWheel">
                    <img src="@/assets/arrow-right.svg" alt=">">
                </div>
            </div>
<!--                <img src="@/assets/heart.svg" alt="">-->
<!--            </div>-->
<!--            <div class="letter_container" data-index="3">-->
<!--                <img src="@/assets/heart.svg" alt="">-->
<!--            </div>-->
<!--            <div class="letter_container" data-index="4">-->
<!--                <img src="@/assets/heart.svg" alt="">-->
<!--            </div>-->
    </div>
</template>

<style scoped>
    .wheel_container {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        //position: relative;
        width: 37.5rem;
        height: 37.5rem;
        //transform: translateY(19.75rem);
        //transform: translateY(19.5rem);
        transform: translateY(16rem);
        //margin-top: 19.5rem;
    }

    .wheel_wrapper {
        transition: transform .5s;
        width: 100%;
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
        opacity: 0%;
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
</style>