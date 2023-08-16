<template>
  <main class="flex flex-col items-center">
    <div class="card-container">
      <div class="card-row">
        <StudentCard
          class="student"
          v-for="student in displayedStudentsEven"
          :key="student.id"
          :student="student"
        ></StudentCard>
      </div>
      <div class="card-row">
        <StudentCard
          class="student"
          v-for="student in displayedStudentsOdd"
          :key="student.id"
          :student="student"
        ></StudentCard>
      </div>
    </div>
    <div class="w-500 pagination mt-10 justify-center">
    <div class="change-page">

    </div>
  <RouterLink
    :to="{ name: 'studentlist', query: { page: page - 1 } }"
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
    :to="{ name: 'studentlist', query: { page: page + 1 } }"
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
    <link
      href="https://fonts.googleapis.com/css2?family=Concert+One&family=Kanit:wght@600&family=Poiret+One&family=Racing+Sans+One&display=swap"
      rel="stylesheet"
    />
  </main>
</template>
<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student'
import { ref, computed, type Ref, onMounted } from 'vue'
import type { AxiosResponse } from 'axios';
import { useRouter } from 'vue-router'
import NProgress from 'nprogress'
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStudentAllStore } from '@/stores/all_student'
import isFormValid from '@/views/AboutView.vue'
import addStudent from '@/views/AboutView.vue'
import StudentsInfoServices from '@/services/StudentsInfoServices'
import { onBeforeRouteUpdate } from 'vue-router'
const studentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(studentStore_all)
const students: Ref<studentInfo[]> = ref([])
const totalStudent = ref<number>(0)
const router = useRouter
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const displayedStudentsEven: Ref<studentInfo[]> = computed(() => {
  const startIndex = (props.page - 1) * 4;
  const endIndex = startIndex + 2;
  return student_all.value.slice(startIndex, endIndex);
});

const displayedStudentsOdd: Ref<studentInfo[]> = computed(() => {
  const startIndex = (props.page - 1) * 4 + 2;
  const endIndex = startIndex + 2;
  return student_all.value.slice(startIndex, endIndex);
});

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(student_all.value.length / 4); 
  console.log(totalPages)
  return props.page < totalPages;
});

onBeforeRouteLeave((to, from, next) => {
  if (isFormValid.value) {
    new addStudent()
  }
  next()
})
NProgress
StudentsInfoServices.getStudent().then((response: AxiosResponse<studentInfo[]>) => {
  students.value = response.data
  totalStudent.value = response.headers['x-total-count']
}).catch(() => {
  router().push({ name: 'NetworkError' });
// }).finally(() => {
//   NProgress.done()
})
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // NProgress.start()
  StudentsInfoServices.getStudent().then((response: AxiosResponse<studentInfo[]>) => {
    students.value = response.data
    totalStudent.value = response.headers['x-total-count']
  next()
  }).catch(() => {
    next({ name: 'NetworkError' })
  // }).finally(() => {
  //   NProgress.done()
  })
})

</script>

<style scoped>

.pagination{
  width: 550px;
}
.student {
  font-family: 'Poiret One', cursive;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-row {
  margin-right: 40px;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px; /* Adjust spacing between rows */
}

.card-row .student {
  width: 48%; /* Adjust card width */
}

@media (max-width: 1024px) {
  .card-row .student {
    width: 100%;
  }
  .pagination{
  width: 450px;
}
}


</style>
