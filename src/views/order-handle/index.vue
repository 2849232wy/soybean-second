<script lang="ts">
import { defineComponent, reactive } from 'vue';
defineOptions({
  name: 'OrderHandle'
});
const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
];

const data = Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}));

export default defineComponent({
  setup() {
    const paginationReactive = reactive({
      page: 2,
      pageSize: 5,
      showSizePicker: true,
      pageSizes: [3, 5, 7],
      onChange: (page: number) => {
        paginationReactive.page = page;
      },
      onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
      }
    });

    return {
      data,
      columns,
      pagination: paginationReactive
    };
  }
});
</script>

<template>
  <NDataTable :columns="columns" :data="data" :pagination="pagination" />
</template>
