<script lang="ts" setup>
import {computed, useSlots} from "vue";

defineProps({
  placeHolder: {
    type: String,
    default: ''
  }
})
const slots = useSlots()

const hasPrependIcon = computed(() => {
  return !!slots['prepend'];
})

const input = defineModel<string>()

</script>

<template>
  <el-input
    v-model="input"
    class="input flex border border-border outline-none rounded-lg overflow-hidden bg-bg"
    :placeholder="placeHolder"
  >
    <template v-if="hasPrependIcon" #prepend>
      <div class="h-full flex items-center p-3">
        <slot name="prepend"/>
      </div>
    </template>
  </el-input>
</template>

<style scoped lang="scss">
:deep(input) {
  @apply w-full p-3 pl-0 bg-bg outline-none font-medium text-sm;
}

:deep(.ep-input__wrapper) {
  @apply grow
}
</style>