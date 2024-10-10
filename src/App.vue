<script lang="ts" setup>
import Grid from "./components/grid.vue";
</script>

<template>
  <el-config-provider namespace="ep">
    <div class="h- w-screen flex">
      <el-scrollbar>
        <el-main class="px-[120px] py-[80px]">
          <router-view v-slot="{ Component, route }">
            <transition name="el-fade-in-linear">
              <component :is="Component" :key="route.path"/>
            </transition>
          </router-view>
        </el-main>
      </el-scrollbar>
    </div>
  </el-config-provider>
</template>
