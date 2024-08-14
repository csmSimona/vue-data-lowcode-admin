<script setup lang="jsx">
  import { computed, defineProps } from 'vue';
  import CollapseItem from '@/components/CollapseItem/index.vue';
  import {
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignBottomOutlined,
    EditOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
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

  // 图例类型
  const legendTypeOptions = [
    {
      label: '分段式',
      value: 'piecewise',
    },
    {
      label: '连续式',
      value: 'continuous',
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

  // 地图
  const mapRegionOptions = [
    {
      label: '中国',
      value: 'china'
    },
    {
      label: '浙江省',
      value: 330000
    },
    {
      label: '舟山市',
      value: 330900
    },
    {
      label: '普陀区',
      value: 330903
    },
  ]

  // 投影类型
  const projectionTypeOptions = [
    {
      label: '自定义投影',
      value: 'custom',
    },
    {
      label: '墨卡托投影',
      value: 'Mercator',
    },
  ];

  // 新增颜色
  const addColor = (index) => {
    chartConfig.value.colorRange.splice(index + 1, 0, '#ffffff')
  };
  // 删除颜色
  const delColor = (index) => {
    chartConfig.value.colorRange?.length > 1 && chartConfig.value.colorRange.splice(index, 1);
  };

  // 新增配色条件
  const handleAddCondition = () => {
    chartConfig.value.pieces.push({
      min: 0,
      max: 0,
      label: '无',
      color: '#ffffff',
    })
  }
  // 删除配色条件
  const handleDeleteCondition = (index) => {
    chartConfig.value.pieces?.length > 1 && chartConfig.value.pieces.splice(index, 1);
  };

</script>

<template>
  <CollapseItem name="标题">
    <template #header>
      <NSwitch v-model:value="chartConfig.showTitle" size="small" />
    </template>

    <NFormItemRow label="地图标题" path="seriesName">
      <NInput v-model:value="chartConfig.seriesName" />
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
  </CollapseItem>

  <CollapseItem name="基础地图">
    <NFormItemRow label="地图区域" path="mapName">
      <NSelect v-model:value="chartConfig.mapName" :options="mapRegionOptions" />
    </NFormItemRow>
    <NFormItemRow label="缩放比例" path="zoom">
      <NInputNumber v-model:value="chartConfig.zoom" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="文本标签展示" path="showLabel">
      <NSwitch v-model:value="chartConfig.showLabel" size="small" />
    </NFormItemRow>
    <NFormItemRow label="文本标签颜色" path="labelColor">
      <NColorPicker v-model:value="chartConfig.labelColor" />
    </NFormItemRow>
    <NFormItemRow label="文本标签字号" path="labelFontSize">
      <NInputNumber v-model:value="chartConfig.labelFontSize" :min="10" class="w-full" />
    </NFormItemRow>

    <NFormItemRow label="悬浮弹窗展示" path="showTooltip">
      <NSwitch v-model:value="chartConfig.showTooltip" size="small" />
    </NFormItemRow>
    <NFormItemRow label="悬浮弹窗背景" path="tooltipBg">
      <NColorPicker v-model:value="chartConfig.tooltipBg" size="small" />
    </NFormItemRow>
    <NFormItemRow label="悬浮弹窗文本颜色" path="tooltipColor">
      <NColorPicker v-model:value="chartConfig.tooltipColor" size="small" />
    </NFormItemRow>

    <NFormItemRow label="区域边框" path="borderColor">
      <NColorPicker v-model:value="chartConfig.borderColor" />
    </NFormItemRow>
    <NFormItemRow label="鼠标悬停聚焦" path="emphasisAreaColor">
      <NColorPicker v-model:value="chartConfig.emphasisAreaColor" />
    </NFormItemRow>

    <NFormItemRow label="自动轮播" path="autoPlay">
      <NSwitch v-model:value="chartConfig.autoPlay" size="small" />
    </NFormItemRow>
    <NFormItemRow label="轮播间隔" path="interval">
      <NInputNumber v-model:value="chartConfig.interval" :min="1000" class="w-full">
        <template #suffix> 毫秒 </template>
      </NInputNumber>
    </NFormItemRow>

    <NFormItemRow label="地图投影" path="showProjection">
      <NSwitch v-model:value="chartConfig.showProjection" size="small" />
    </NFormItemRow>
    <NFormItemRow label="投影类型" path="projectionType">
      <NSelect v-model:value="chartConfig.projectionType" :options="projectionTypeOptions" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="图例">
    <template #header>
      <NSwitch v-model:value="chartConfig.showLegend" size="small" />
    </template>
    <NFormItemRow label="图例布局方式" path="legendOrient">
      <NSelect v-model:value="chartConfig.legendOrient" :options="legendOrientOptions" />
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

    <NFormItemRow label="图例类型" path="legendType">
      <NSelect v-model:value="chartConfig.legendType" :options="legendTypeOptions" />
    </NFormItemRow>

    <NFormItemRow label="配色条件" v-if="chartConfig.legendType === 'piecewise'" />
    <div
      class="flex flex-col w-full gap-[10px] bg-slate-50 p-[10px] mt-[-10px]"
      v-if="chartConfig.legendType === 'piecewise'"
    >
      <div v-for="(item, index) in chartConfig.pieces" :key="index">
        <div class="conditionItem">
          <span class="label">标签</span>
          <NInput v-model:value="item.label" />
        </div>
        <div class="conditionItem">
          <span class="label">数值区间</span>
          <NInput v-model:value="item.min" :style="{ width: '45%' }" />&nbsp;~&nbsp;
          <NInput v-model:value="item.max" :style="{ width: '45%' }" />
        </div>
        <div class="conditionItem">
          <span class="label">颜色</span>
          <NColorPicker v-model:value="item.color" />
        </div>
        <NButton
          @click="handleDeleteCondition(index)"
          :disabled="chartConfig.pieces?.length < 2"
          class="w-full mb-[10px]"
        >
          删除
        </NButton>
        <NDivider class="my-[5px]" />
      </div>

      <NButton @click="handleAddCondition" class="w-full" type="primary">新增条件</NButton>
    </div>

    <NFormItemRow label="颜色分布" v-else>
      <div class="flex flex-col w-full gap-[10px]">
        <div v-for="(item, index) in chartConfig.colorRange" :key="index" class="flex items-center">
          <NColorPicker v-model:value="chartConfig.colorRange[index]" />
          <n-icon
            :component="MinusCircleOutlined"
            @click="delColor(index)"
            class="action-icon"
            :style="{
              cursor: chartConfig.colorRange?.length > 1 ? 'pointer' : 'not-allowed',
            }"
          />
          <n-icon :component="PlusCircleOutlined" @click="addColor(index)" class="action-icon" />
        </div>
      </div>
    </NFormItemRow>
  </CollapseItem>
</template>

<style scoped lang="scss">
.action-icon {
  cursor: pointer;
  margin-left: 3px;
  font-size: 16px;
}

.conditionItem {
  display: flex;
  align-items: center;
  line-height: 34px;
  margin-bottom: 10px;
  .label {
    display: inline-block;
    width: 90px;
  }
}
</style>