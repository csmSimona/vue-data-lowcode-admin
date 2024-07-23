import { createApp } from 'vue';
import './plugins/assets';
import {
  setupAppVersionNotification,
  setupCustomComponents,
  setupDayjs,
  setupIconifyOffline,
  setupLoading,
  setupNProgress
} from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import App from './App.vue';

async function setupApp() {
  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  setupCustomComponents(app);

  setupStore(app);

  await setupRouter(app);

  // 语言注册
  setupI18n(app);

  setupAppVersionNotification();

  // 挂载到页面
  app.mount('#app');

  // // 挂载到 window
  // (window as any).$vue = app;
}

setupApp();
