<script setup lang="ts">
import { defineOptions } from 'vue';
import type { Props } from './type';

defineOptions({
  name: 'TableAction'
});
const props = defineProps<Props>();
</script>

<template>
  <div>
    <NSpace>
      <template v-for="(item, index) in props.props" :key="index">
        <NButton v-if="!item.isPopConfirm" v-bind="item">{{ item.label }}</NButton>
        <NPopconfirm v-else v-bind="item">
          <template #trigger>
            <NButton>{{ item.label }}</NButton>
          </template>
          {{ item.popConfirmText }}
        </NPopconfirm>
      </template>
    </NSpace>
  </div>
</template>

<style lang="scss" scoped></style>
