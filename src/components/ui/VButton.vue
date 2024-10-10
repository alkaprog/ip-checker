<script lang="ts" setup>
import {PropType} from "vue";
import {ButtonVariant} from "../../types/ui-components-types";

defineProps({
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'default'
  }
})
</script>

<template>
  <el-button
    :class="[
      'px-4 text-sm font-medium rounded-lg hover:opacity-80',
      {
        'bg-dark text-white': variant === 'dark',
        'bg-bg': variant === 'default'
      }
    ]"
  >
    <slot/>
  </el-button>
</template>

<style scoped>

</style>