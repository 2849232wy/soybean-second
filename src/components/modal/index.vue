<script setup lang="ts">
defineOptions({
  name: 'BasicModal',
  inheritAttrs: false
});
const isShowModal = defineModel<boolean>('isShowModal');

// eslint-disable-next-line vue/define-props-declaration
const props = defineProps({
  titleText: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
});
</script>

<template>
  <NModal v-model:show="isShowModal" :auto-focus="false" v-bind="$attrs" preset="dialog" :mask-closable="false">
    <template #header>
      <slot v-if="$slots.header"></slot>
      <div v-else>
        {{ props.titleText }}
      </div>
    </template>
    <div>
      <slot name="default"></slot>
    </div>
    <template #action>
      <slot v-if="$slots.action"></slot>
      <div v-else>
        <NSpace>
          <NButton type="info">{{ props.confirmText }}</NButton>
          <NButton @click="isShowModal = false">{{ props.cancelText }}</NButton>
        </NSpace>
      </div>
    </template>
  </NModal>
</template>

<style lang="scss" scoped></style>
