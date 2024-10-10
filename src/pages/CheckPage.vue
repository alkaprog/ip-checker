<script setup lang="ts">
import {useRoute} from "vue-router";
import {useIpStore} from "../store/IpStore";
import {computed, ref} from "vue";
import VStripedTable from "../components/ui/VStripedTable.vue";
import Bowser from "bowser";
import ArrowRightIcon from "../components/icons/ArrowRightIcon.vue";

const route = useRoute()

const ipStore = useIpStore()

const userSystem = ref<{ browser: { name: string, version: string }, os: { name } } | null>(null)

const targetIp = computed(() => route.params.ip as string)
const targetIpInfo = computed(() => ipStore.ipInfo[targetIp.value] || null)
const mappedTargetIpInfo = computed(() => {
  if (targetIpInfo.value) {
    const keys = Object.keys(targetIpInfo.value)
    return keys.map(key => ({
      key,
      value: targetIpInfo.value[key]
    }))
  }
  return []
})
const mappedUserSystem = computed(() => userSystem.value ? [
  {
    key: 'ОС',
    value: userSystem.value.os.name
  },
  {
    key: 'Браузер',
    value: userSystem.value.browser.name
  },
  {
    key: 'Версия браузера',
    value: userSystem.value.browser.version
  }
] : [])

const init = () => {
  if (targetIp.value && !ipStore.ipInfo[targetIp.value]) {
    ipStore.fetchIpInfo(targetIp.value)
  }
  getUserSystemInfo()
}
const getUserSystemInfo = () => {
  userSystem.value = Bowser.parse(window.navigator.userAgent) as {
    browser: { name: string, version: string },
    os: { name }
  };
}

init()
</script>

<template>
  <div>
    <div class="flex items-center gap-4  mb-6">
      <router-link to="/">
        <arrow-right-icon class="h-6 w-6 rotate-180"/>
      </router-link>
      <h1 class="text-xl font-bold">{{ targetIp }}</h1>
    </div>
    <div class="flex gap-4">
      <div class="flex-[1_1_0px] self-start border border-border rounded-2xl overflow-hidden">
        <v-striped-table :data="mappedTargetIpInfo"/>
      </div>
      <div class="flex-[1_1_0px] self-start border border-border rounded-2xl">
        <v-striped-table :data="mappedUserSystem"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>