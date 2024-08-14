import type { App } from 'vue';
import LineChart from '@/components/Charts/LineChart/index.vue';
import BarChart from '@/components/Charts/BarChart/index.vue';
import PieChart from '@/components/Charts/PieChart/index.vue';
import BaseMap from '@/components/Charts/BaseMap/index.vue';

import LineChartOption from '@/components/Charts/LineChart/option.vue';
import BarChartOption from '@/components/Charts/BarChart/option.vue';
import PieChartOption from '@/components/Charts/PieChart/option.vue';
import BaseMapOption from '@/components/Charts/BaseMap/option.vue';

/**
 * 全局注册自定义组件
 *
 * @param app
 */
export function setupCustomComponents(app: App) {
  // 注册图表组件
  app.component('LineChart', LineChart);
  app.component('BarChart', BarChart);
  app.component('PieChart', PieChart);
  app.component('RingChart', PieChart);
  app.component('CarouselRingChart', PieChart);
  app.component('BaseMap', BaseMap);
  app.component('CarouselMap', BaseMap);
  app.component('ProjectionMap', BaseMap);

  // 注册图表配置组件
  app.component('LineChartOption', LineChartOption);
  app.component('BarChartOption', BarChartOption);
  app.component('PieChartOption', PieChartOption);
  app.component('RingChartOption', PieChartOption);
  app.component('CarouselRingChartOption', PieChartOption);
  app.component('BaseMapOption', BaseMapOption);
  app.component('CarouselMapOption', BaseMapOption);
  app.component('ProjectionMapOption', BaseMapOption);
}
