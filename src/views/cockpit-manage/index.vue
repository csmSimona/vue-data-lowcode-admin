<script setup lang="jsx">
import { reactive, ref, watch } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { getTableList } from '@/api/table/list';
import bg from '@/assets/bg.jpg';

const message = useMessage();
const dialog = useDialog();
const router = useRouter();

const pageSize = 11;
const page = ref(1);
const loading = ref(false);
const record = reactive({});
function getDataList() {
  loading.value = true;
  getTableList({
    page: page.value,
    pageSize
  })
    .then((data) => {
      record.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
}

watch(
  page,
  () => {
    getDataList();
  },
  {
    immediate: true
  }
);

// 预览大屏
function handlePreview(id) {
  const href = router.resolve({
      path: '/preview',
      query: {
        id,
        type: 'view'
      }
   })
  window.open(href.href, '_blank')
}

// 编辑大屏
function handleEdit(id) {
  router.push(`/designer?id=${id}`);
}

// 删除大屏
function handleDelete(id) {
  dialog.warning({
    title: '警告',
    content: '确认要删除该大屏吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      // TODO 删除大屏api
      message.success('删除成功');
      getDataList();
    },
    onNegativeClick: () => {}
  });
}
</script>

<template>
  <div>
    <NCard :bordered="false" size="small" class="mt-10px card-wrapper">
      <NSpin :show="loading">
        <div class="recordBox">
          <div class="recordCard" @click="router.push('/designer')">
            <div class="add">
              <icon-ic-round-plus class="text-icon" />
              新增大屏
            </div>
          </div>
          <div v-for="item in record.value?.list" :key="item.id" class="recordCard">
            <!-- TODO 大屏缩略图 -->
            <div class="content">
              <!-- <img :src="bg" /> -->
            </div>
            <div class="desc">
              <span>{{ item.name }}</span>
              <span>{{ item.endTime }}</span>
            </div>
            <div class="mask">
              <span class="action" @click="handlePreview(item.id)">预览</span>
              <span class="action" @click="handleEdit(item.id)">编辑</span>
              <span class="action" @click="handleDelete(item.id)">删除</span>
            </div>
          </div>
          <div v-if="!record.value" class="h-40vh" />
        </div>
      </NSpin>
      <div class="flex justify-center">
        <NPagination
          v-if="record.value"
          v-model:page="page"
          :page-size="pageSize"
          :item-count="record.value?.itemCount"
        />
      </div>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.recordBox {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 16px;
  .recordCard {
    border: 1px solid #e5e5e5;
    width: calc((100% - 45px) / 4);
    min-width: 250px;
    height: 200px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    .content {
      flex: 1;
      background: rgb(170, 203, 235, 0.5);
    }
    .desc {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .add {
      flex: 1;
      background: rgb(170, 203, 235, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .recordCard:hover {
    border: 1px solid rgb(45, 140, 240);
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(127, 127, 127, 0.2);
    display: none;
    align-items: center;
    justify-content: space-evenly;
    color: #000;
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgb(45, 140, 240, 0.8);
    border-radius: 50%;
    color: #fff;
  }

  .recordCard:hover .mask {
    display: flex;
  }
}
</style>
