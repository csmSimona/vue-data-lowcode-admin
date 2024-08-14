<script setup lang="jsx">
  import { computed, defineProps } from 'vue';
  import CollapseItem from '@/components/CollapseItem/index.vue';
  import {
    DeleteOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignBottomOutlined,
    EditOutlined,
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

  // 图例位置x
  const legendPositionXOptions = [
    {
      label: AlignLeftOutlined,
      value: 'left',
    },
    {
      label: AlignCenterOutlined,
      value: 'center',
    },
    {
      label: AlignRightOutlined,
      value: 'right',
    },
    {
      label: EditOutlined,
      value: 'edit'
    }
  ];

  // 图例位置y
  const legendPositionYOptions = [
    {
      label: VerticalAlignTopOutlined,
      value: 'top',
    },
    {
      label: VerticalAlignMiddleOutlined,
      value: 'center',
    },
    {
      label: VerticalAlignBottomOutlined,
      value: 'bottom',
    },
    {
      label: EditOutlined,
      value: 'edit'
    }
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
      value: 'false',
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
    chartConfig.value.pieColor.splice(index + 1, 0, '#ffffff')
  };
  // 删除颜色
  const delColor = (index) => {
    chartConfig.value.pieColor?.length > 1 && chartConfig.value.pieColor.splice(index, 1);
  };
</script>

<template>
  <CollapseItem name="饼图">
    <NFormItemRow label="内环大小" path="radiusInside">
      <NInputNumber v-model:value="chartConfig.radiusInside" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="外环大小" path="radiusOutside">
      <NInputNumber v-model:value="chartConfig.radiusOutside" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="起始角度" path="startAngle">
      <NInputNumber v-model:value="chartConfig.startAngle" :min="0" :max="360" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="南丁格尔图" path="roseType">
      <NSelect v-model:value="chartConfig.roseType" :options="roseTypeOptions" />
    </NFormItemRow>
    <NFormItemRow label="边框颜色" path="borderColor">
      <NColorPicker v-model:value="chartConfig.borderColor" />
    </NFormItemRow>
    <NFormItemRow label="边框宽度" path="borderWidth">
      <NInputNumber v-model:value="chartConfig.borderWidth" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="圆角" path="borderRadius">
      <NInputNumber v-model:value="chartConfig.borderRadius" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="文本标签位置" path="labelPosition">
      <NSelect v-model:value="chartConfig.labelPosition" :options="labelPositionOptions" />
    </NFormItemRow>
    <NFormItemRow label="文本标签展示类型" path="labelShowType">
      <NSelect v-model:value="chartConfig.labelShowType" :options="labelShowTypeOptions" />
    </NFormItemRow>
    <NFormItemRow label="文本标签颜色" path="labelColor">
      <NColorPicker v-model:value="chartConfig.labelColor" />
    </NFormItemRow>
    <NFormItemRow label="文本标签字号" path="labelFontSize">
      <NInputNumber v-model:value="chartConfig.labelFontSize" :min="10" class="w-full" />
    </NFormItemRow>

    <NFormItemRow label="饼图颜色">
      <div class="flex flex-col w-full gap-[10px]">
        <div v-for="(item, index) in chartConfig.pieColor" :key="index" class="flex items-center">
          <NColorPicker v-model:value="chartConfig.pieColor[index]" />
          <n-icon
            :component="MinusCircleOutlined"
            @click="delColor(index)"
            class="action-icon"
            :style="{
              cursor: chartConfig.pieColor?.length > 1 ? 'pointer' : 'not-allowed',
            }"
          />
          <n-icon :component="PlusCircleOutlined" @click="addColor(index)" class="action-icon" />
        </div>
      </div>
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

  <CollapseItem name="图例">
    <template #header>
      <NSwitch v-model:value="chartConfig.showLegend" size="small" />
    </template>
    <NFormItemRow label="图例布局方式" path="legendOrient">
      <NSelect v-model:value="chartConfig.legendOrient" :options="legendOrientOptions" />
    </NFormItemRow>
    <NFormItemRow label="图例形状" path="legendIcon">
      <NSelect v-model:value="chartConfig.legendIcon" :options="legendIconOptions" />
    </NFormItemRow>
    <NFormItemRow label="图例位置(X)" path="legendX">
      <div class="flex flex-col">
        <n-radio-group v-model:value="chartConfig.legendX">
          <n-radio-button
            v-for="option in legendPositionXOptions"
            :key="option.value"
            :value="
              option.value === 'edit'
                ? isNaN(chartConfig.legendX)
                  ? 0
                  : chartConfig.legendX
                : option.value
            "
          >
            <n-icon :component="option.label" class="text-[14px]" />
          </n-radio-button>
        </n-radio-group>
        <NInputNumber
          v-if="!isNaN(chartConfig.legendX)"
          v-model:value="chartConfig.legendX"
          class="w-full mt-[10px]"
        />
      </div>
    </NFormItemRow>

    <NFormItemRow label="图例位置(Y)" path="legendY">
      <div class="flex flex-col">
        <n-radio-group v-model:value="chartConfig.legendY">
          <n-radio-button
            v-for="option in legendPositionYOptions"
            :key="option.value"
            :value="
              option.value === 'edit'
                ? isNaN(chartConfig.legendY)
                  ? 0
                  : chartConfig.legendY
                : option.value
            "
          >
            <n-icon :component="option.label" class="text-[14px]" />
          </n-radio-button>
        </n-radio-group>
        <NInputNumber
          v-if="!isNaN(chartConfig.legendY)"
          v-model:value="chartConfig.legendY"
          class="w-full mt-[10px]"
        />
      </div>
    </NFormItemRow>
    <NFormItemRow label="图例文本颜色" path="legendTextColor">
      <NColorPicker v-model:value="chartConfig.legendTextColor" />
    </NFormItemRow>
    <NFormItemRow label="图例字号" path="legendFontSize">
      <NInputNumber v-model:value="chartConfig.legendFontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="标题">
    <template #header>
      <NSwitch v-model:value="chartConfig.showTitle" size="small" />
    </template>

    <NFormItemRow label="文本" path="text">
      <NInput v-model:value="chartConfig.text" />
    </NFormItemRow>
    <NFormItemRow label="标题位置(X)" path="titleX">
      <div class="flex flex-col">
        <n-radio-group v-model:value="chartConfig.titleX">
          <n-radio-button
            v-for="option in legendPositionXOptions"
            :key="option.value"
            :value="
              option.value === 'edit'
                ? isNaN(chartConfig.titleX)
                  ? 0
                  : chartConfig.titleX
                : option.value
            "
          >
            <n-icon :component="option.label" class="text-[14px]" />
          </n-radio-button>
        </n-radio-group>
        <NInputNumber
          v-if="!isNaN(chartConfig.titleX)"
          v-model:value="chartConfig.titleX"
          class="w-full mt-[10px]"
        />
      </div>
    </NFormItemRow>
    <NFormItemRow label="标题位置(Y)" path="titleY">
      <div class="flex flex-col">
        <n-radio-group v-model:value="chartConfig.titleY">
          <n-radio-button
            v-for="option in legendPositionYOptions"
            :key="option.value"
            :value="
              option.value === 'edit'
                ? isNaN(chartConfig.titleY)
                  ? 0
                  : chartConfig.titleY
                : option.value
            "
          >
            <n-icon :component="option.label" class="text-[14px]" />
          </n-radio-button>
        </n-radio-group>
        <NInputNumber
          v-if="!isNaN(chartConfig.titleY)"
          v-model:value="chartConfig.titleY"
          class="w-full mt-[10px]"
        />
      </div>
    </NFormItemRow>
    <NFormItemRow label="标题颜色" path="titleColor">
      <NColorPicker v-model:value="chartConfig.titleColor" />
    </NFormItemRow>
    <NFormItemRow label="标题字号" path="titleFontSize">
      <NInputNumber v-model:value="chartConfig.titleFontSize" :min="10" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="副标题" path="subtext">
      <NInput v-model:value="chartConfig.subtext" />
    </NFormItemRow>
    <NFormItemRow label="副标题颜色" path="subtextColor">
      <NColorPicker v-model:value="chartConfig.subtextColor" />
    </NFormItemRow>
    <NFormItemRow label="副标题字号" path="subtextFontSize">
      <NInputNumber v-model:value="chartConfig.subtextFontSize" :min="10" class="w-full" />
    </NFormItemRow>
  </CollapseItem>
</template>

<style scoped>
.action-icon {
  cursor: pointer;
  margin-left: 3px;
  font-size: 16px;
}
</style>