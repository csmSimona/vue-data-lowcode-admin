import type { App } from 'vue';
import BaseBarChart from '@/components/Charts/BaseBarChart/index.vue';
import BaseLineChart from '@/components/Charts/BaseLineChart/index.vue';
import BasePieChart from '@/components/Charts/BasePieChart/index.vue';

import BaseMap from '@/components/Charts/BaseMap/index.vue';

import BaseBarChartOption from '@/components/Charts/BaseBarChart/option.vue';
import BaseLineChartOption from '@/components/Charts/BaseLineChart/option.vue';
import BasePieChartOption from '@/components/Charts/BasePieChart/option.vue';

import BaseMapOption from '@/components/Charts/BaseMap/option.vue';

/**
 * 全局注册自定义组件
 *
 * @param app
 */
export function setupCustomComponents(app: App) {
  // 注册图表组件
  app.component('BaseBarChart', BaseBarChart);
  app.component('BaseLineChart', BaseLineChart);
  app.component('BasePieChart', BasePieChart);
  app.component('RingChart', BasePieChart);
  app.component('CarouselRingChart', BasePieChart);

  app.component('BaseMap', BaseMap);
  app.component('CarouselMap', BaseMap);
  app.component('ProjectionMap', BaseMap);

  // 注册图表配置组件
  app.component('BaseBarChartOption', BaseBarChartOption);
  app.component('BaseLineChartOption', BaseLineChartOption);
  app.component('BasePieChartOption', BasePieChartOption);
  app.component('RingChartOption', BasePieChartOption);
  app.component('CarouselRingChartOption', BasePieChartOption);

  app.component('BaseMapOption', BaseMapOption);
  app.component('CarouselMapOption', BaseMapOption);
  app.component('ProjectionMapOption', BaseMapOption);
}
