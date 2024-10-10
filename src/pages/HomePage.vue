<script setup lang="ts">
import IpCheck from "../components/IpCheck.vue";
import {useIpStore} from "../store/IpStore";
import IpList from "../components/IpList.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const ipStore = useIpStore()
const onCheckStart = (ips: string[]) => {
  ips.map((ip) => ipStore.fetchIpInfo(ip))
  saveIpsToQueryParams(ips)
}

const saveIpsToQueryParams = (ips: string[]) => {
  router.push({path: '/', query: ips.length > 0 ? {ips: JSON.stringify(ips)} : null})
}
</script>

<template>
  <ip-check class="mb-10" @check-start="onCheckStart"/>
  <ip-list/>
</template>

<style scoped>

</style>