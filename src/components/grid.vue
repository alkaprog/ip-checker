<script setup>
    const colors = ["","bg-slate-100", "bg-slate-200", "bg-slate-300"];
</script>
<template>
  <div class="flex flex-col gap-1">
    <div v-for="row in 10" class="flex gap-1">
      <div v-for="col in 10" class="w-6 h-6 border border-gray-400"></div>
    </div>
  </div>
  <el-row>
    <el-col v-for="idx in 3" :span="8" :class="colors[idx]">你好</el-col>
  </el-row>
</template>
<style scoped></style>
