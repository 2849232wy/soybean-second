<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { defineOptions } from 'vue';
import TableColumnSetting from '@/components/advanced/table-column-setting.vue';
import { useAppStore } from '@/store/modules/app';
import type { Config, Emits } from './type';
defineOptions({
  name: 'BasicTable'
});
const props = defineProps<Config>();
const emits = defineEmits<Emits>();
const appStore = useAppStore();
const columnChecks = defineModel<NaiveUI.TableColumnCheck[]>('columnChecks', { required: true });
const handleRefresh = () => {
  emits('refresh');
};
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div>
        <slot name="toolbar"></slot>
      </div>
      <div class="flex justify-end">
        <slot name="operation"></slot>
        <div>
          <ReloadButton @click="handleRefresh" />
          <FullScreen :full="appStore.fullContent" @click="appStore.toggleFullContent" />
          <TableColumnSetting v-model:columns="columnChecks"></TableColumnSetting>
        </div>
      </div>
    </div>
    <NDataTable :columns="props.columns" :data="props.data" />
    <div class="flex justify-end pt-5">
      <NPagination v-bind="props.pagination" />
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-pagination-prefix) {
  color: black;
}
</style>
