<script setup lang="jsx">
  import { computed, defineProps } from 'vue';
  import CollapseItem from '@/components/CollapseItem/index.vue';
  import PositionRange from '@/components/PositionRange/index.vue';
  import {
    MinusCircleOutlined,
    PlusCircleOutlined
  } from '@vicons/antd';

  const props = defineProps({
    config: {
      type: Object,
      default: () => {},
    },
  });

  const chartConfig = computed(() => {
    return props.config;
  });

  const color = computed(() => {
    return props.config.color;
  });

  const title = computed(() => {
    return props.config.title;
  });

  const legend = computed(() => {
    return props.config.legend;
  });

  const series = computed(() => {
    return props.config.series[0];
  });
  
  // 图例布局方式
  const legendOrientOptions = [
    {
      label: '横向',
      value: 'horizontal',
    },
    {
      label: '纵向',
      value: 'vertical',
    },
  ];

  // 图例形状
  const legendIconOptions = [
    {
      label: '圆形',
      value: 'circle',
    },
    {
      label: '矩形',
      value: 'rect',
    },
    {
      label: '圆角矩形',
      value: 'roundRect',
    },
    {
      label: '三角形',
      value: 'triangle',
    },
    {
      label: '菱形',
      value: 'diamond',
    },
  ];

  // 文本标签位置
  const labelPositionOptions = [
    {
      label: '内部',
      value: 'inside',
    },
    {
      label: '外侧',
      value: 'outside',
    },
    {
      label: '中心',
      value: 'center',
    },
  ];

  // 文本标签显示类型
  const labelShowTypeOptions = [
    {
      label: '仅名称',
      value: 'name',
    },
    {
      label: '数值',
      value: 'data',
    },
    {
      label: '百分比',
      value: 'percent',
    },
  ];

  // 南丁格尔图
  const roseTypeOptions = [
    {
      label: '不展示',
      value: 'none',
    },
    {
      label: '圆心角',
      value: 'radius',
    },
    {
      label: '扇区',
      value: 'area',
    },
  ];

  // 新增颜色
  const addColor = (index) => {
    color.value.splice(index + 1, 0, '#ffffff')
  };
  // 删除颜色
  const delColor = (index) => {
    color.value?.length > 1 && color.value.splice(index, 1);
  };
</script>

<template>
  <CollapseItem name="标题">
    <template #header>
      <NSwitch v-model:value="title.show" size="small" />
    </template>

    <NFormItemRow label="文本">
      <NInput v-model:value="title.text" />
    </NFormItemRow>
    <NFormItemRow label="标题位置(X)">
      <PositionRange v-model:position="title.left" type="x" />
    </NFormItemRow>
    <NFormItemRow label="标题位置(Y)">
      <PositionRange v-model:position="title.top" type="y" />
    </NFormItemRow>
    <NFormItemRow label="标题颜色">
      <NColorPicker v-model:value="title.textStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="标题字号">
      <NInputNumber v-model:value="title.textStyle.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="图例">
    <template #header>
      <NSwitch v-model:value="legend.show" size="small" />
    </template>
    <NFormItemRow label="图例布局方式">
      <NSelect v-model:value="legend.orient" :options="legendOrientOptions" />
    </NFormItemRow>
    <NFormItemRow label="图例形状">
      <NSelect v-model:value="legend.icon" :options="legendIconOptions" />
    </NFormItemRow>
    <NFormItemRow label="图例位置(X)">
      <PositionRange v-model:position="legend.x" type="x" />
    </NFormItemRow>

    <NFormItemRow label="图例位置(Y)">
      <PositionRange v-model:position="legend.y" type="y" />
    </NFormItemRow>
    <NFormItemRow label="图例文本颜色">
      <NColorPicker v-model:value="legend.textStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="图例字号">
      <NInputNumber v-model:value="legend.textStyle.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="饼图">
    <NFormItemRow label="饼图名称">
      <NInput v-model:value="series.name" />
    </NFormItemRow>
    <NFormItemRow label="内环大小">
      <NInputNumber v-model:value="series.radiusInside" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="外环大小">
      <NInputNumber v-model:value="series.radiusOutside" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="起始角度">
      <NInputNumber v-model:value="series.startAngle" :min="0" :max="360" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="南丁格尔图">
      <NSelect v-model:value="series.roseType" :options="roseTypeOptions" />
    </NFormItemRow>

    <NFormItemRow label="边框颜色">
      <NColorPicker v-model:value="series.itemStyle.borderColor" />
    </NFormItemRow>
    <NFormItemRow label="边框宽度">
      <NInputNumber v-model:value="series.itemStyle.borderWidth" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="圆角">
      <NInputNumber v-model:value="series.itemStyle.borderRadius" class="w-full" />
    </NFormItemRow>

    <NFormItemRow label="文本标签位置">
      <NSelect v-model:value="series.label.position" :options="labelPositionOptions" />
    </NFormItemRow>
    <NFormItemRow label="文本标签展示类型">
      <NSelect v-model:value="series.label.labelShowType" :options="labelShowTypeOptions" />
    </NFormItemRow>
    <NFormItemRow label="文本标签颜色">
      <NColorPicker v-model:value="series.label.color" />
    </NFormItemRow>
    <NFormItemRow label="文本标签字号">
      <NInputNumber v-model:value="series.label.fontSize" :min="10" class="w-full" />
    </NFormItemRow>

    <NFormItemRow label="自动轮播" path="autoPlay">
      <NSwitch v-model:value="chartConfig.autoPlay" size="small" />
    </NFormItemRow>
    <NFormItemRow label="轮播间隔" path="interval">
      <NInputNumber v-model:value="chartConfig.interval" :min="1000" class="w-full">
        <template #suffix> 毫秒 </template>
      </NInputNumber>
    </NFormItemRow>
    <NFormItemRow label="轮播显示提示" path="showTooltip">
      <NSwitch v-model:value="chartConfig.showTooltip" size="small" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="饼图颜色">
    <div class="flex flex-col w-full gap-[10px]">
      <div v-for="(item, index) in color" :key="index" class="flex items-center">
        <NColorPicker v-model:value="color[index]" class="mr-[6px]" />
        <n-icon
          :component="MinusCircleOutlined"
          @click="delColor(index)"
          class="action-icon"
          :style="{
            cursor: color?.length > 1 ? 'pointer' : 'not-allowed',
          }"
        />
        <n-icon :component="PlusCircleOutlined" @click="addColor(index)" class="action-icon" />
      </div>
    </div>
  </CollapseItem>
</template>

<style scoped>
.action-icon {
  cursor: pointer;
  margin-left: 3px;
  font-size: 16px;
}
</style>