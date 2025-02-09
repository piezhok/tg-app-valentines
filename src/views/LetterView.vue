<script setup>
</script>

<template>
    <div class="inner">
        <div class="header">
            <router-link to="/received" class="back-button">
                <span>&lt;</span>
            </router-link>
            <div class="username">@piezhok</div>
            <div class="delete-button">
                <span>🗑</span>
            </div>
        </div>
        <div class="content">
            Lorem ipsum
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