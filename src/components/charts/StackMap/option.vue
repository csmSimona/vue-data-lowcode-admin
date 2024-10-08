<script setup lang="jsx">
  import { computed, defineProps } from 'vue';
  import CollapseItem from '@/components/CollapseItem/index.vue';
  import PositionRange from '@/components/PositionRange/index.vue';
  import ColorRange from '@/components/ColorRange/index.vue';

  const props = defineProps({
    config: {
      type: Object,
      default: () => {},
    },
  });

  const chartConfig = computed(() => {
    return props.config;
  });

  const title = computed(() => {
    return props.config.title;
  });
  const tooltip = computed(() => {
    return props.config.tooltip;
  });
  const visualMap = computed(() => {
    return props.config.visualMap;
  });
  const geo = computed(() => {
    return props.config.geoConfig;
  });
  const scatterConfig = computed(() => {
    return props.config.series[1];
  });
  const linesConfig = computed(() => {
    return props.config.series[2];
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

  // 散点形状
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
    {
      label: '箭头',
      value: 'arrow',
    },
  ];

  // 涟漪的绘制方式
  const rippleEffectOptions = [
    {
      value: 'fill',
      label: '实心'
    },
    {
      value: 'stroke',
      label: '空心'
    }
  ]
  // 新增配色条件
  const handleAddCondition = () => {
    visualMap.value.pieces.push({
      min: 0,
      max: 0,
      label: '无',
      color: '#ffffff',
    })
  }
  // 删除配色条件
  const handleDeleteCondition = (index) => {
    visualMap.value.pieces?.length > 1 && visualMap.value.pieces.splice(index, 1);
  };

</script>

<template>
  <CollapseItem name="标题">
    <template #header>
      <NSwitch v-model:value="title.show" size="small" />
    </template>
    <NFormItemRow label="地图标题">
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

  <CollapseItem name="提示框">
    <template #header>
      <NSwitch v-model:value="tooltip.show" size="small" />
    </template>
    <NFormItemRow label="弹窗背景">
      <NColorPicker v-model:value="tooltip.backgroundColor" size="small" />
    </NFormItemRow>
    <NFormItemRow label="文本颜色">
      <NColorPicker v-model:value="tooltip.textStyle.color" size="small" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="图例" v-if="visualMap">
    <template #header>
      <NSwitch v-model:value="visualMap.show" size="small" />
    </template>
    <NFormItemRow label="图例布局方式">
      <NSelect v-model:value="visualMap.orient" :options="legendOrientOptions" />
    </NFormItemRow>

    <NFormItemRow label="图例位置(X)">
      <PositionRange v-model:position="visualMap.left" type="x" />
    </NFormItemRow>
    <NFormItemRow label="图例位置(Y)">
      <PositionRange v-model:position="visualMap.top" type="y" />
    </NFormItemRow>

    <NFormItemRow label="图例文本颜色">
      <NColorPicker v-model:value="visualMap.textStyle.color" />
    </NFormItemRow>

    <NFormItemRow label="图例类型">
      <NSelect v-model:value="visualMap.type" :options="legendTypeOptions" />
    </NFormItemRow>

    <NFormItemRow label="配色条件" v-if="visualMap.type === 'piecewise'" />
    <div
      class="flex flex-col w-full gap-[10px] bg-slate-50 p-[10px] mt-[-10px]"
      v-if="visualMap.type === 'piecewise'"
    >
      <div v-for="(item, index) in visualMap.pieces" :key="index">
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
          :disabled="visualMap.pieces?.length < 2"
          class="w-full mb-[10px]"
        >
          删除
        </NButton>
        <NDivider class="my-[5px]" />
      </div>

      <NButton @click="handleAddCondition" class="w-full" type="primary">新增条件</NButton>
    </div>

    <NFormItemRow label="颜色分布" v-else>
      <ColorRange v-model:color="visualMap.inRange.color" :data-length="1" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="基础地图">
    <NFormItemRow label="地图区域">
      <NSelect v-model:value="geo.map" :options="mapRegionOptions" />
    </NFormItemRow>
    <NFormItemRow label="缩放比例">
      <NInputNumber v-model:value="geo.layoutSize" class="w-full">
        <template #suffix> % </template>
      </NInputNumber>
    </NFormItemRow>
    <NFormItemRow label="地图长宽比">
      <NInputNumber v-model:value="geo.aspectScale" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="禁止鼠标事件">
      <NSwitch v-model:value="geo.silent" size="small" />
    </NFormItemRow>

    <NFormItemRow label="文本标签展示">
      <NSwitch v-model:value="geo.label.normal.show" size="small" />
    </NFormItemRow>
    <NFormItemRow label="文本标签颜色">
      <NColorPicker v-model:value="geo.label.normal.color" />
    </NFormItemRow>
    <NFormItemRow label="文本标签字号">
      <NInputNumber v-model:value="geo.label.normal.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="鼠标悬停聚焦颜色">
      <NColorPicker v-model:value="geo.areaColor" />
    </NFormItemRow>
    <NFormItemRow label="自动轮播">
      <NSwitch v-model:value="chartConfig.autoPlay" size="small" />
    </NFormItemRow>
    <NFormItemRow label="轮播间隔">
      <NInputNumber v-model:value="chartConfig.interval" :min="1000" class="w-full">
        <template #suffix> 毫秒 </template>
      </NInputNumber>
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="散点">
    <NFormItemRow label="显示文本标签">
      <NSwitch v-model:value="scatterConfig.label.show" size="small" />
    </NFormItemRow>
    <NFormItemRow label="文本颜色">
      <NColorPicker v-model:value="scatterConfig.label.color" />
    </NFormItemRow>
    <NFormItemRow label="文本字号">
      <NInputNumber v-model:value="scatterConfig.label.fontSize" :min="10" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="散点形状">
      <NSelect v-model:value="scatterConfig.symbol" :options="legendIconOptions" />
    </NFormItemRow>
    <NFormItemRow label="散点大小">
      <NInputNumber v-model:value="scatterConfig.symbolSize" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="散点颜色">
      <NColorPicker v-model:value="scatterConfig.itemStyle.color" />
    </NFormItemRow>
    <NFormItemRow label="涟漪的绘制方式">
      <NSelect
        v-model:value="scatterConfig.rippleEffect.brushType"
        :options="rippleEffectOptions"
      />
    </NFormItemRow>
    <NFormItemRow label="涟漪大小">
      <NInputNumber v-model:value="scatterConfig.rippleEffect.scale" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="涟漪颜色">
      <NColorPicker v-model:value="scatterConfig.rippleEffect.color" />
    </NFormItemRow>
  </CollapseItem>

  <CollapseItem name="飞线">
    <NFormItemRow label="标记形状">
      <NSelect v-model:value="linesConfig.effect.symbol" :options="legendIconOptions" />
    </NFormItemRow>
    <NFormItemRow label="标记大小">
      <NInputNumber v-model:value="linesConfig.effect.symbolSize" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="标记颜色">
      <NColorPicker v-model:value="linesConfig.effect.color" />
    </NFormItemRow>
    <NFormItemRow label="特效动画时间">
      <NInputNumber v-model:value="linesConfig.effect.period" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="特效尾迹长度">
      <NInputNumber
        v-model:value="linesConfig.effect.trailLength"
        :min="0"
        :max="1"
        class="w-full"
      />
    </NFormItemRow>

    <NFormItemRow label="线条颜色">
      <NColorPicker v-model:value="linesConfig.lineStyle.normal.color" />
    </NFormItemRow>
    <NFormItemRow label="线条宽度">
      <NInputNumber v-model:value="linesConfig.lineStyle.normal.width" :min="0" class="w-full" />
    </NFormItemRow>
    <NFormItemRow label="线条透明度">
      <NInputNumber
        v-model:value="linesConfig.lineStyle.normal.opacity"
        :min="0"
        :max="1"
        class="w-full"
      />
    </NFormItemRow>
    <NFormItemRow label="线条曲度">
      <NInputNumber
        v-model:value="linesConfig.lineStyle.normal.curveness"
        :min="0"
        :max="1"
        class="w-full"
      />
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