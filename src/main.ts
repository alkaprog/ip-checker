import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import './assets/style/index.scss'
import {createPinia} from "pinia";

const pinia = createPinia()
const app = createApp(App);

app.use(elementPlus);
app.use(router);
app.use(pinia);

router
  .isReady()
  .then(() => app.mount('#app'))
  .catch(e => console.error(e));
