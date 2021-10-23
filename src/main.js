import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

// костыль-заглушка бд
window.globalData = {};