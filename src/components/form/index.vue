<script lang="ts" setup>
import { defineOptions } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import type { Props } from '@/typings/naive-form';
defineOptions({
  name: 'BasicForm',
  inheritAttrs: false
});
const { formRef, validate } = useNaiveForm();

const props = defineProps<Props>();
const rules = props.formConfig.reduce((acc: any, cur: any) => {
  if (cur.rule) {
    acc[cur.name] = cur.rule ?? null;
  }
  return acc;
}, {});

defineExpose({
  validate
});
</script>

<template>
  <NForm
    ref="formRef"
    :model="formValue"
    :rules="rules"
    v-bind="$attrs"
    label-width="auto"
    label-placement="left"
    label-align="right"
  >
    <NGrid v-bind="props.gridConfig">
      <NGridItem v-for="item in formConfig" :key="item.name" :span="item.span">
        <NFormItem :label="item.label" :path="item.name">
          <NInput v-if="item.type === 'input'" v-model:value="formValue[item.name]" v-bind="item.attribute" />
          <NSwitch v-else-if="item.type === 'switch'" v-model:value="formValue[item.name]" v-bind="item.attribute" />
          <NCheckboxGroup v-else-if="item.type === 'checkbox'" v-model:value="formValue[item.name]">
            <NSpace>
              <NCheckbox v-for="option in item.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </NCheckbox>
            </NSpace>
          </NCheckboxGroup>
          <NRadioGroup v-else-if="item.type === 'radio'" v-model:value="formValue[item.name]">
            <NSpace>
              <NRadio v-for="option in item.options" :key="option.value" :value="option.value" :name="item.name">
                {{ option.label }}
              </NRadio>
            </NSpace>
          </NRadioGroup>
          <NTimePicker v-else-if="item.type === 'datetime'" v-model:value="formValue[item.name]" />
          <NSelect
            v-else-if="item.type === 'select'"
            v-model:value="formValue[item.name]"
            v-bind="item.attribute"
            :options="item.options"
          ></NSelect>
          <slot v-else-if="item.slot" :name="item.slot" v-bind="formValue"></slot>
          <component :is="item.type" v-else :value="formValue[item.name]" v-bind="item.attribute"></component>
        </NFormItem>
      </NGridItem>
    </NGrid>
  </NForm>
</template>
