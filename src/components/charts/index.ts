// // 从文件系统导入多个模块
// const configModules: Record<string, { default: string }> = import.meta.glob('./**/config.ts', {
//   eager: true, // 直接引入所有的模块
// });

// export const ChartList = Object.keys(configModules).map((key) => configModules[key].default);

import BaseBarChart from './BaseBarChart/config';
import HorizontalBarChart from './HorizontalBarChart/config';
import StackBarChart from './StackBarChart/config';
import PictorialStackBarChart from './PictorialStackBarChart/config';
import BaseLineChart from './BaseLineChart/config';
import LineAreaChart from './LineAreaChart/config';
import BarLineChart from './BarLineChart/config';
import ScatterChart from './ScatterChart/config';
import BasePieChart from './BasePieChart/config';
import RingChart from './RingChart/config';
import CarouselRingChart from './CarouselRingChart/config';
import BaseMap from './BaseMap/config';
import CarouselMap from './CarouselMap/config';
import ProjectionMap from './ProjectionMap/config';
import ScatterMap from './ScatterMap/config';
import StackMap from './StackMap/config';
import Pseudo3DMap from './Pseudo3DMap/config';

export const ChartList = [
  BaseBarChart,
  HorizontalBarChart,
  StackBarChart,
  PictorialStackBarChart,
  BaseLineChart,
  LineAreaChart,
  BarLineChart,
  ScatterChart,
  BasePieChart,
  RingChart,
  CarouselRingChart,
  BaseMap,
  CarouselMap,
  ProjectionMap,
  ScatterMap,
  StackMap,
  Pseudo3DMap,
];
