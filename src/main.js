import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {hubConnection} from './plugins/signalr.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.config.globalProperties.$signalr = hubConnection;
app.mount('#app');