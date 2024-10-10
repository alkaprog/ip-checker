<script setup lang="ts">
import {ref} from "vue";
import VButton from "./ui/VButton.vue";
import {useRoute} from "vue-router";

const emit = defineEmits(['checkStart'])

const route = useRoute()

const input = ref(getInitialInput())
const placeHolderText = `195.16.32.227
195.16.32.227
195.16.32.227
195.16.32.227
`
const onCheckStart = () => {
  const ips = input.value
    .split(/\r?\n/)
    .filter(ip => ip)
    .map(ip => ip.trim())

  if (ips.length > 0) {
    emit('checkStart', ips)
  }
}

function getInitialInput() {
  const ips = route.query.ips
  if (ips) {
    const parsedIps = JSON.parse(ips as string)
    if (Array.isArray(parsedIps)) {
      return parsedIps.join('\r\n')
    }
  }
  return ''
}

const init = () => {
  if (input.value) {
    onCheckStart()
  }
}
init()
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-6">Проверка IP</h1>
    <div class="bg-bg p-6 rounded-2xl">
      <el-input
        v-model="input"
        class="input mb-6"
        type="textarea"
        autosize
        :placeholder="placeHolderText"
      />
      <v-button
        class="h-[36px]"
        variant="dark"
        @click="onCheckStart"
      >
        Начать проверку
      </v-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input > * {
  @apply w-full min-h-[180px] p-3 text-sm outline-none !important;
}
</style>