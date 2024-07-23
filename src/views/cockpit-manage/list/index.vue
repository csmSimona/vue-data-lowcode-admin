<script setup lang="jsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetRoleList } from '@/service/api';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useRouterPush } from '@/hooks/common/router';
import RoleOperateDrawer from './components/role-operate-drawer.vue';
import RoleSearch from './components/role-search.vue';

const { routerPushByKey } = useRouterPush();

const { columns, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetRoleList,
  apiParams: {
    current: 1,
    size: 10,
    status: null,
    roleName: null,
    roleCode: null
  },
  columns: () => [
    {
      key: 'index',
      title: '序号',
      width: 64,
      align: 'center'
    },
    {
      key: 'roleName',
      title: '角色名称',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'roleCode',
      title: '角色编码',
      align: 'center',
      minWidth: 120
    },
    {
      key: 'roleDesc',
      title: '角色描述',
      minWidth: 120
    },
    {
      key: 'status',
      title: '角色状态',
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap = {
          1: 'success',
          2: 'warning'
        };

        const enableStatusMap = {
          1: '启用',
          2: '禁用'
        };

        const label = enableStatusMap[row.status];

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'operate',
      title: '操作',
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: '确认删除吗',
              trigger: () => (
                <NButton type="error" ghost size="small">
                  删除
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, onDeleted } = useTableOperate(data, getData);

function handleDelete(id) {
  // request
  console.log(id);

  onDeleted();
}

function edit(id) {
  handleEdit(id);
}
</script>

<template>
  <div>
    <RoleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />

    <NCard :bordered="false" size="small" class="mt-20px card-wrapper">
      <NButton type="primary" class="mb-16px mr-20px" @click="routerPushByKey('designer')">
        <template #icon>
          <icon-ic-round-plus class="text-icon" />
        </template>
        新增大屏
      </NButton>

      <NButton type="primary" class="mb-16px" @click="handleAdd">
        <template #icon>
          <icon-ic-round-plus class="text-icon" />
        </template>
        新增
      </NButton>

      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />

      <RoleOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
