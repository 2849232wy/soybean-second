<script setup lang="ts">
import { computed, h, reactive, ref, unref } from 'vue';
import dayjs from 'dayjs';
import type { UploadCustomRequestOptions } from 'naive-ui';
import { NInputNumber, NSwitch, NUpload } from 'naive-ui';
import type { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { useTable } from '@/hooks/common/table';
import { getUnboxCeleList } from '@/service/api/unbox-cele';
import BasicTable from '@/components/table/index.vue';
import TableAction from '@/components/table-action/index.vue';
import BaiscForm from '@/components/form/index.vue';
import type { Config } from '@/typings/naive-form';
import BasicModal from '@/components/modal/index.vue';
import { uploadImg } from '@/service/api/common';
const handleUpdateTop = (value: boolean, key: string, row: any) => {};

const handleUpdateSort = (value: number | null, key: string, row: any) => {};

const handleUpdateStatus = (value: number | null, key: string, row: any) => {};

const handleShowDetail = (row: any) => {};

const handleDelete = (row: any) => {};

const formConfig = reactive([
  {
    name: 'name',
    label: '姓名',
    type: 'input',
    span: 6
  },
  {
    name: 'type',
    label: '类型',
    type: 'select',
    span: 6,
    options: [
      {
        label: '素人',
        value: 1
      },
      {
        label: '影响者',
        value: 0
      }
    ]
  }
]);

const formValue = reactive({
  name: null,
  type: null
});

const resetForm = () => {
  Object.assign(formValue, {
    name: null,
    type: null
  });
};

const getActionGroup = (row: any) => {
  return h(TableAction, {
    props: [
      {
        onClick: () => handleShowDetail(row),
        label: '查看详情'
      },
      {
        type: 'error',
        onClick: () => handleDelete(row),
        label: '删除',
        isPopConfirm: true,
        popConfirmText: '确定删除吗？',
        onPositiveClick: () => {
          console.log('positiveClick');
        }
      }
    ]
  });
};

const tableConfig = ref<NaiveUI.NaiveTableConfig<NaiveUI.TableApiFn>>({
  apiFn: getUnboxCeleList,
  columns: () => [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '类型',
      key: 'type',
      render: (row: any) => (row.type === 1 ? '素人' : '影响者')
    },
    {
      title: '简介',
      key: 'intro'
    },
    {
      title: '价格',
      key: 'price'
    },
    {
      title: '视频数量',
      key: 'video_url',
      render: (row: any) => row.videos.length
    },
    {
      title: '添加时间',
      key: 'created_at',
      render: (row: any) => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '置顶',
      key: 'is_top',
      render: (row: any) => {
        return h(NSwitch, {
          value: Boolean(row.is_top),
          onUpdateValue: value => handleUpdateTop(value, 'is_top', row)
        });
      }
    },
    {
      title: '上下架',
      key: 'status',
      render: (row: any) => {
        return h(NSwitch, {
          value: Boolean(row.status),
          onUpdateValue: value => handleUpdateStatus(value, 'status', row)
        });
      }
    },
    {
      title: '排序',
      key: 'sort',
      render: (row: any) => {
        return h(NInputNumber, {
          value: row.sort,
          style: { width: '100px' },
          onUpdateValue: value => handleUpdateSort(value, 'sort', row)
        });
      }
    },
    {
      title: '操作',
      key: 'action',
      render: row => getActionGroup(row)
    }
  ],
  apiParams: {
    page: 1,
    page_size: 10
  },
  immediate: true,
  showTotal: true
});

const { data, columns, pagination, getData, columnChecks, updateSearchParams } = useTable(unref(tableConfig));
const tableColumn = columns as unknown as TableColumn[];

const handleSearch = () => {
  updateSearchParams(formValue);
  getData();
};

const formTitleType = ref<'edit' | 'add'>('add');
const isShowModal = ref<boolean>(false);
const formTitle = computed(() => {
  return `${formTitleType.value === 'add' ? '添加' : '编辑'}开箱视频网红`;
});
const unboxCeleForm = reactive<{
  name: null | string;
  price: null | string;
  video: string[];
}>({
  name: null,
  price: null,
  video: []
});
const unboxCeleFormConfig = reactive([
  {
    type: 'input',
    name: 'name',
    rule: [{ required: true, trigger: 'blur', message: '请输入网红名称' }],
    label: '网红名称'
  },
  {
    type: 'input',
    name: 'price',
    rule: [{ required: true, trigger: 'blur', message: '请输入价格' }],
    label: '价格'
  },
  {
    type: NUpload,
    name: 'video',
    label: '视频',
    attribute: {
      accept: 'image/*',
      listType: 'image-card',
      max: 1,
      defaultFileList: unboxCeleForm.video,
      customRequest: async ({ file }: UploadCustomRequestOptions) => {
        const formData = new FormData();
        formData.append('file', file.file!);
        formData.append(file.name, file.file as File);
        const res = await uploadImg(formData);
        unboxCeleForm.video.push(res.data.full_url);
      }
    }
  }
] satisfies Config[]);
</script>

<template>
  <div>
    <BaiscForm
      :grid-config="{ xGap: 12 }"
      :form-config="formConfig"
      :form-value="formValue"
      label-width="auto"
      label-placement="left"
    ></BaiscForm>
    <NSpace>
      <NButton type="info" @click="handleSearch">查询</NButton>
      <NButton @click="resetForm">重置</NButton>
    </NSpace>
    <BasicModal v-model:isShowModal="isShowModal" :title-text="formTitle">
      <template #default>
        <BaiscForm
          :form-config="unboxCeleFormConfig"
          :form-value="unboxCeleForm"
          :grid-config="{ cols: '1' }"
          :show-require-mark="false"
        ></BaiscForm>
      </template>
    </BasicModal>
    <BasicTable
      v-model:column-checks="columnChecks"
      :pagination="pagination"
      :data="data"
      :columns="tableColumn"
      @refresh="getData"
    >
      <template #operation>
        <NButton type="primary" @click="isShowModal = true">新增</NButton>
      </template>
    </BasicTable>
  </div>
</template>

<style lang="scss" scoped>
:deep(.n-pagination-suffix) {
  color: black;
}
</style>
