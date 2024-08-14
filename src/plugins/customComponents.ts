import type { App } from 'vue';
import LineChart from '@/components/Charts/LineChart/index.vue';
import BarChart from '@/components/Charts/BarChart/index.vue';
import PieChart from '@/components/Charts/PieChart/index.vue';
import BaseMap from '@/components/Charts/BaseMap/index.vue';
import TooltipMap from '@/components/Charts/TooltipMap/index.vue';
import ProjectionMap from '@/components/Charts/ProjectionMap/index.vue';

import LineChartOption from '@/components/Charts/LineChart/option.vue';
import BarChartOption from '@/components/Charts/BarChart/option.vue';
import PieChartOption from '@/components/Charts/PieChart/option.vue';
import BaseMapOption from '@/components/Charts/BaseMap/option.vue';
import TooltipMapOption from '@/components/Charts/TooltipMap/option.vue';
import ProjectionMapOption from '@/components/Charts/ProjectionMap/option.vue';

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
  app.component('BaseMap', BaseMap);
  app.component('TooltipMap', TooltipMap);
  app.component('ProjectionMap', ProjectionMap);

  // 注册图表配置组件
  app.component('LineChartOption', LineChartOption);
  app.component('BarChartOption', BarChartOption);
  app.component('PieChartOption', PieChartOption);
  app.component('BaseMapOption', BaseMapOption);
  app.component('TooltipMapOption', TooltipMapOption);
  app.component('ProjectionMapOption', ProjectionMapOption);
}
