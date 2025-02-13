<script setup>

</script>

<template>
    <nav class="nav-bar_container glass">
        <router-link to="/received">
            <svg :class="{ active: $route.path.includes('/received' )}" width="80" height="62" viewBox="0 0 80 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 28C0 19.1634 7.16344 12 16 12H64C72.8366 12 80 19.1634 80 28V58C80 60.2091 78.2091 62 76 62H4C1.79086 62 0 60.2091 0 58V28ZM6 28C6 22.4772 10.4772 18 16 18H18C23.5228 18 28 22.4772 28 28V54C28 55.1046 27.1046 56 26 56H8C6.89543 56 6 55.1046 6 54V28ZM45.9014 28.8851C43.3662 31.3987 43.3662 35.4739 45.9014 37.9875L56 48L66.0986 37.9875C68.6338 35.4739 68.6338 31.3987 66.0986 28.8851C63.5635 26.3716 59.4532 26.3716 56.9181 28.8851L56 29.7954L55.0819 28.8851C52.5468 26.3716 48.4365 26.3716 45.9014 28.8851Z" fill="#5E5E5E"/>
                <path d="M34 2C34 0.89543 34.8954 0 36 0H43V17H34V2Z" fill="#5E5E5E"/>
                <path d="M40 0H48C49.1046 0 50 0.895431 50 2V4C50 5.10457 49.1046 6 48 6H40V0Z" fill="#5E5E5E"/>
            </svg>
        </router-link>
        <router-link to="/sent">
            <svg :class="{ active: $route.path.includes('/sent' )}" width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.858 2.05636C19.4282 -0.685454 15.5718 -0.685454 14.142 2.05636L0.457272 28.2989C-1.15905 31.3984 1.7801 34.9148 5.04128 33.7832L15.4574 30.1687C15.44 30.1011 15.4332 30.0292 15.4388 29.9553L16.9497 9.95948C17.0098 9.16471 18.1534 9.16472 18.2135 9.95948L19.7244 29.9553C19.7314 30.0482 19.7188 30.1378 19.6903 30.22L29.9587 33.7832C33.2199 34.9148 36.159 31.3984 34.5427 28.2989L20.858 2.05636Z" fill="#5E5E5E"/>
            </svg>
        </router-link>
        <router-link to="/new">
            <svg :class="{ active: $route.path === '/new' }" width="72" height="61" viewBox="0 0 72 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.2959 33.5179C73.9014 25.8502 73.9014 13.4184 66.2959 5.75076C58.6905 -1.91692 46.3596 -1.91692 38.7542 5.75076L36 8.52748L33.2458 5.75076C25.6404 -1.91692 13.3095 -1.91692 5.70408 5.75076C-1.90136 13.4184 -1.90136 25.8502 5.70408 33.5179L30.8157 58.835C33.6789 61.7217 38.3211 61.7217 41.1843 58.835L66.2959 33.5179ZM22 30C22 28.3431 23.3431 27 25 27H33V19C33 17.3431 34.3431 16 36 16C37.6569 16 39 17.3431 39 19V27H47C48.6569 27 50 28.3431 50 30C50 31.6569 48.6569 33 47 33H39V41C39 42.6569 37.6569 44 36 44C34.3431 44 33 42.6569 33 41V33H25C23.3431 33 22 31.6569 22 30Z" fill="#5E5E5E"/>
            </svg>
        </router-link>
    </nav>
</template>

<style scoped lang="scss">
    .nav-bar_container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 4rem;
        width: 100%;
        padding: .875rem 0;
        position: sticky;
        bottom: 0;
        //right: 1rem;
        //left: 1rem;
    }

    a {
        height: 100%;
    }

    svg {
        height: 100%;
        width: 100%;
        * {
            transition: all .5s;
        }
    }

    img {
        height: 100%;
    }

    .active {
        * {
            fill: white;
        }
    }

    @media (max-height: 600px) {
        .nav-bar_container {
            display: none;
        }
    }
</style>