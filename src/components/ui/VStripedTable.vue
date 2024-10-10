<script setup lang="ts">
import {PropType} from "vue";

defineProps({
  data: {
    type: Array as PropType<{ key: string, value: string }[]>,
    default: () => []
  }
})
</script>

<template>
  <table
    class="w-full text-sm "
  >
    <tr
      v-for="row in data"
      :key="`row-${row}`"
      class="h-[44px] border-b border-border last:border-none even:bg-bg"
    >
      <th class="font-medium">{{ row.key }}:</th>
      <th class="font-normal">{{ row.value }}</th>
    </tr>
  </table>
</template>

<style scoped lang="scss">

</style>