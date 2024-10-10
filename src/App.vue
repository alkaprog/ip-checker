<script lang="ts" setup>
import Grid from "./components/grid.vue";
</script>

<template>
  <el-config-provider namespace="ep">
    <div class="h-screen w-full">
        <el-main class="px-[120px] py-[80px]">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path"/>
          </router-view>
        </el-main>
    </div>
  </el-config-provider>
</template>
