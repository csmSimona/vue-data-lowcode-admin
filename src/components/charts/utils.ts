// 从文件系统导入多个模块
const indexModules: Record<string, { default: string }> = import.meta.glob('./**/index.vue', {
  eager: true, // 直接引入所有的模块
});
const optionModules: Record<string, { default: string }> = import.meta.glob('./**/option.vue', {
  eager: true,
});

// 获取组件
export const fetchComponent = (key, type) => {
  if (type === 'option') {
    return optionModules[`./${key}/option.vue`].default;
  }
  return indexModules[`./${key}/index.vue`].default;
};

// 动态注册图表和图表配置组件
export const registerComponent = (key) => {
  if (!window['$vue'].component(key)) {
    window['$vue'].component(key, fetchComponent(key, 'chart'));
  }
  if (!window['$vue'].component(key + 'Option')) {
    window['$vue'].component(key + 'Option', fetchComponent(key, 'option'));
  }
};
