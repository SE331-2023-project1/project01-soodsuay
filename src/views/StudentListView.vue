<template>
  <main class="flex flex-col items-center">
    <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink :to="{name: 'studentlist', query: {page: page - 1} }" rel="prev" v-if="page != 1" id="page-prev" class="text-left mr-auto">Prev Page</RouterLink>
      <RouterLink :to="{name: 'studentlist', query: {page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next" class="text-right ml-auto">Next Page</RouterLink>
    </div>
    <!-- <select id="perpage" v-model="perPage">
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="6">6</option>
     </select> -->
  </main>
</template>
<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student';
import type { Ref } from 'vue'
import { computed, ref} from 'vue'
import StudentService from '@/services/StudentsInfoServices'
import { useRouter } from 'vue-router';
import type { AxiosResponse } from 'axios';
import { onBeforeRouteUpdate } from 'vue-router';

const students: Ref<Array<studentInfo>> = ref([])
const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})
StudentService.getStudent(3, props.page).then((response: AxiosResponse<studentInfo[]>) => {
  students.value = response.data
  totalEvent.value = response.headers['x-total-count']
  })
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  StudentService.getStudent(3, toPage).then((response: AxiosResponse<studentInfo[]>) => {
  students.value = response.data
  totalEvent.value = response.headers['x-total-count']
  next()
  })
})

</script>

<style scoped>

</style>