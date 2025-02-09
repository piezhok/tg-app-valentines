import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);

const passPhrase = await decodeURIComponent(window.Telegram.WebApp.initData).split("hash=")[1];
console.log(passPhrase);

app.use(store);
app.use(router);
app.mount('#app');
