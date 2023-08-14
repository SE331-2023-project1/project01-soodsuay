<template>
  <main class="flex flex-col items-center">
    <StudentCard
      class="student"
      v-for="student in displayedStudents"
      :key="student.id"
      :student="student"
    ></StudentCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink :to="{name: 'studentlist', query: {page: page - 1} }" rel="prev" v-if="page != 1" id="page-prev" style="font-family: 'Racing Sans One', cursive;" class="text-left mr-auto">Prev Page</RouterLink>
      <RouterLink :to="{name: 'studentlist', query: {page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next" style="font-family: 'Racing Sans One', cursive;" class="text-right ml-auto">Next Page</RouterLink>
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
import { useRouter } from 'vue-router'
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStudentAllStore } from '@/stores/all_student'
import isFormValid from '@/views/AboutView.vue'
import addStudent from '@/views/AboutView.vue'
const studentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(studentStore_all)
const students: Ref<studentInfo[]> = ref([])
const totalStudent = ref<number>(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})



const displayedStudents: Ref<studentInfo[]> = computed(() => {
  const startIndex = (props.page - 1) * 3
  const endIndex = startIndex + 3
  return student_all.value.slice(startIndex, endIndex)
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(student_all.value.length / 3)
  return props.page < totalPages
})

// Store new students before leaving the page
onBeforeRouteLeave((to, from, next) => {
  if (isFormValid.value) {
    new addStudent()
  }
  next()
})

// StudentService.getStudent(3, props.page).then((response: AxiosResponse<studentInfo[]>) => {
//   students.value = response.data
//   totalEvent.value = response.headers['x-total-count']
//   })
// onBeforeRouteUpdate((to, from, next) => {
//   const toPage = Number(to.query.page)
//   StudentService.getStudent(3, toPage).then((response: AxiosResponse<studentInfo[]>) => {
//   students.value = response.data
//   totalEvent.value = response.headers['x-total-count']
//   next()
//   })
// })
</script>

<style scoped>
.student {
  font-family: 'Poiret One', cursive;
}
.button-52 {
  font-size: 16px;
  font-weight: 12;
  letter-spacing: 1px;
  padding: 8px 15px 8px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 95px;
}

.button-52:after {
  content: '';
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.button-52:hover:after {
  top: 0px;
  left: 0px;
}
input {
  height: 40px;
  padding: 20px;
  margin-left: 70px;
  margin-bottom: 10px;
}
form {
  display: inline-block;
  width: 400px;
  cursor: pointer;
  text-align: left;
  align-items: center;
}

@media (min-width: 768px) {
  .button-52 {
    padding: 8px 15px 8px;
  }
}
</style>
