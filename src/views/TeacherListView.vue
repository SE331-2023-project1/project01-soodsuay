<template>
  <div class="student">
    <div class="card-row">
    <TeacherCard v-for="teacher in displayedStudentsEven" :key="teacher.id" :teacher="teacher"></TeacherCard>
    </div>
    <div class="card-row">
      <TeacherCard v-for="teacher in displayedStudentsOdd" :key="teacher.id" :teacher="teacher"></TeacherCard>
      </div>
      <div class="w-500 pagination mt-10 justify-center">
      <RouterLink
    :to="{ name: 'teacher', query: { page: page - 1 } }"
    rel="prev"
    v-if="page != 1"
    id="page-prev"
    style="
    font-family: 'Racing Sans One', cursive;
    color: #fff;
    background-color: #1899D6;
    display: inline-block;
    padding: 10px 20px;
    border-radius: 25px;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;"
    class="flex items-center text-center"
  >Prev Page</RouterLink>
  
  <RouterLink
    :to="{ name: 'teacher', query: { page: page + 1 } }"
    rel="next"
    v-if="hasNextPage"
    id="page-next"
    style="
    font-family: 'Racing Sans One', cursive;
    color: #fff;
    background-color: #1899D6;
    display: inline-block;
    padding: 10px 20px;
    border-radius: 25px;
    transition: background-color 0.3s, color 0.3s;"

    class="flex items-center text-center"
  >Next Page</RouterLink>
  </div>
  </div>
</template>
<script lang="ts" setup>
import TeacherCard from '../components/TeacherCard.vue'
import type { TeacherInfo } from '@/teacher'
import type { AxiosResponse } from 'axios';
import TeacherService from '@/services/TeacherService'
import { ref, computed, type Ref, onMounted } from 'vue'
import { useTeacherAllStore } from '@/stores/all_teacher'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import NProgress from 'nprogress'
const router = useRouter
const teachers: Ref<TeacherInfo[]> = ref([])
const totalTeacher = ref<number>(0)
const teacherStoreAll = useTeacherAllStore()
const { teacher_all } = storeToRefs<typeof teacherStoreAll>(teacherStoreAll)
//   const teachers: Ref<Array<TeacherInfo>> = ref([]);
//     TeacherService.getTeacher().then((response) => {
//     teachers.value = response.data;
//     console.log(teachers.value)
//   });
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const displayedStudentsEven: Ref<TeacherInfo[]> = computed(() => {
  const startIndex = (props.page - 1) * 4
  const endIndex = startIndex + 2
  console.log(teacher_all.value.slice(startIndex, endIndex))
  return teacher_all.value.slice(startIndex, endIndex)
})

const displayedStudentsOdd: Ref<TeacherInfo[]> = computed(() => {
  const startIndex = (props.page - 1) * 4 + 2
  const endIndex = startIndex + 2
  return teacher_all.value.slice(startIndex, endIndex)
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(teacher_all.value.length / 4); 
  console.log('teacher'+totalPages)
  return props.page < totalPages;
});
NProgress
TeacherService.getTeacher().then((response: AxiosResponse<TeacherInfo[]>) => {
  teachers.value = response.data
  totalTeacher.value = response.headers['x-total-count']
}).catch(() => {
  router().push({ name: 'NetworkError' });
// }).finally(() => {
//   NProgress.done()
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // NProgress.start()
  TeacherService.getTeacher().then((response: AxiosResponse<TeacherInfo[]>) => {
    teachers.value = response.data
    totalTeacher.value = response.headers['x-total-count']
  next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  // }).finally(() => {
  //   NProgress.done()
  })
})

</script>
<style>
.card-row {
  margin-top: 20px;
  align-items: center;
  width: 100%;
  margin-left: 60px;
}
.student {
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.card-row .student {
  width: 10%; /* Adjust card width */
  
}
.pagination {
  display: flex;
  width: 750px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}

input {
  height: 40px;
  padding: 20px;
  margin-left: auto;
  margin-bottom: 10px;
}
form {
  display: inline-block;
  width: 400px;
  cursor: pointer;
  text-align: left;
}

@media (min-width: 1024px) {
  .card-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px; /* Adjust spacing between rows */
  margin: 20px;
}

}
</style>
