import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {IpInfo} from "../types/ip-types";
import axios from "axios";

export const useIpStore = defineStore('ip', () => {
  const ipInfo = ref<Record<string, IpInfo>>({});

  // @ts-ignore
  const ipInfoList = computed(() => Object.values(ipInfo.value) as IpInfo[])

  async function fetchIpInfo(ip: string) {
    const res = await axios.get<IpInfo>(`http://ip-api.com/json/${ip}`)
    if (res.status === 200 && res.data.status === 'success') {
      ipInfo.value[ip] = res.data
    }
  }

  function removeIp(ip: string) {
    if (ip in ipInfo.value) {
      delete ipInfo.value[ip]
    }
  }

  return {ipInfo, fetchIpInfo, ipInfoList, removeIp};
});
