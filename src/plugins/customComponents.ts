import type { App } from 'vue';
import LineChart from '@/components/charts/LineChart/index.vue';
import BarChart from '@/components/charts/BarChart/index.vue';

import LineChartOption from '@/components/charts/LineChart/option.vue';
import BarChartOption from '@/components/charts/BarChart/option.vue';

/**
 * 全局注册自定义组件
 *
 * @param app
 */
export function setupCustomComponents(app: App) {
  // 注册图表组建
  app.component('LineChart', LineChart);
  app.component('BarChart', BarChart);

  // 注册图表配置组件
  app.component('LineChartOption', LineChartOption);
  app.component('BarChartOption', BarChartOption);
}
