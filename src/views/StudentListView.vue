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
    <div class="flex w-290 pagination mt-4">
      <RouterLink :to="{name: 'studentlist', query: {page: page - 1} }" rel="prev" v-if="page != 1" id="page-prev" style="font-family: 'Racing Sans One', cursive;" class="flex items-center text-left mr-auto" >Prev Page</RouterLink>
      <RouterLink :to="{name: 'studentlist', query: {page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next" style="font-family: 'Racing Sans One', cursive;" class="flex items-center text-left mr-auto">Next Page</RouterLink>

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

</script>

<style scoped>
.student {
  font-family: 'Poiret One', cursive;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px; /* Adjust spacing between rows */
}

.card-row .student {
  width: 48%; /* Adjust card width */
}
.button-19 {
  appearance: button;
  background-color: #1899D6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: din-round,sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 45%;
}

.button-19:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.button-19:main,
.button-19:focus {
  user-select: auto;
}

.button-19:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

.button-19:disabled {
  cursor: auto;
}

@media (max-width: 768px) {
  .card-row .student {
    width: 100%;
  }
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
