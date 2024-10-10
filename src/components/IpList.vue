<script setup lang="ts">
import {useIpStore} from "../store/IpStore";
import SortIcon from "./icons/SortIcon.vue";
import {computed, ref, watch} from "vue";
import VInput from "./ui/VInput.vue";
import debounce from 'lodash.debounce'
import {IpInfo} from "../types/ip-types";
import SearchIcon from "./icons/SearchIcon.vue";
import RemoveIcon from "./icons/RemoveIcon.vue";
import ArrowRightIcon from "./icons/ArrowRightIcon.vue";
import {useRouter} from "vue-router";
import VButton from "./ui/VButton.vue";

const router = useRouter()

const ipStore = useIpStore()

const sortableColumns = ref([
  {
    prop: 'query',
    label: 'IP',
    class: 'opacity-50'
  },
  {
    prop: 'country',
    label: 'Name',
    class: 'opacity-50'
  },
  {
    prop: 'regionName',
    label: 'Region',
    class: 'opacity-50'
  }
])
const search = ref('')
const searchedIps = ref<IpInfo[]>([])

const displayedTableData = computed(() => search.value ? searchedIps.value : ipStore.ipInfoList)

const onSortChange = (sort: { prop: string, order: 'ascending' | 'descending' | null }) => {
  const sortClasses = {
    ascending: '',
    descending: 'rotate-180',
  }
  const classToSet = sort.order in sortClasses ? sortClasses[sort.order] : 'opacity-50'
  const updatedColumnIndex = sortableColumns.value.findIndex(column => column.prop === sort.prop)
  if (updatedColumnIndex !== -1) {
    sortableColumns.value = sortableColumns.value.map((column, index) => (
      {
        ...column,
        class: updatedColumnIndex === index ? classToSet : 'opacity-50'
      }))
  }
}
const onSearchUpdate = debounce((search: string) => {
  search = search.toLowerCase()
  searchedIps.value = ipStore.ipInfoList
    .filter((ipInfo: IpInfo) => ipInfo.country.toLowerCase().includes(search) ||
      ipInfo.region.toLowerCase().includes(search) ||
      ipInfo.query.toLowerCase().includes(search))

}, 300)
const onRemove = (ipInfo: IpInfo) => ipStore.removeIp(ipInfo.query)
const onDetailPageMove = (ipInfo: IpInfo) => router.push(`/check/${ipInfo.query}`)


watch(search, (search) => onSearchUpdate(search))
watch(() => ipStore.ipInfoList, ipInfoList => searchedIps.value = searchedIps.value.filter(ipInfo => ipInfoList.includes(ipInfo)))
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Результаты</h2>
    <div class="border border-border rounded-2xl ">
      <div class="p-6">
        <div class="text-secondary text-sm font-medium mb-2">Поиск по таблице</div>
        <div class="flex gap-4">
          <v-input
            v-model="search"
            class="grow"
            place-holder="Что вы хотите найти?"
          >
            <template #prepend>
              <search-icon class="h-4 w-4"/>
            </template>
          </v-input>
          <v-button>Найти</v-button>
        </div>

      </div>

      <div class="flex">
        <el-table
          :data="displayedTableData"
          class="table"
          @sort-change="onSortChange"
        >
          <el-table-column
            v-for="(column, index) in sortableColumns"
            :key="`column-${index}`"
            :prop="column.prop"
            sortable>
            <template #header>
              <div class="flex gap-2 cursor-pointer">
                <div>{{ column.label }}</div>
                <sort-icon :class="`h-5 w-5 transition-transform ${column.class}`"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template #default="{row}">
              <div class="flex justify-end gap-6">
                <remove-icon class="h-5 w-5 cursor-pointer" @click="onRemove(row)"/>
                <arrow-right-icon class="h-5 w-5 cursor-pointer" @click="onDetailPageMove(row)"/>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
:deep(.table) {
  @apply w-full !important;

  & thead {
    @apply h-[44px] bg-bg overflow-hidden border-b border-border;

    & th {
      @apply p-3 text-sm text-secondary font-medium;

      &:first-child {
        @apply rounded-tl-lg
      }

      &:last-child {
        @apply rounded-tr-lg
      }
    }
  }

  & tr {
    @apply h-[44px] text-sm border-b border-border;

    & td {
      @apply p-3
    }

    &:nth-child(even) {
      @apply bg-bg
    }
  }
}

:deep(.ep-table__header) {
  @apply w-full !important;
}
</style>