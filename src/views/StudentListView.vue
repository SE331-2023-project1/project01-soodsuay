<template>
  <main class="flex flex-col items-center">
    <StudentCard class="student" v-for="student in displayedStudents" :key="student.id" :student="student"></StudentCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink :to="{name: 'studentlist', query: {page: page - 1} }" rel="prev" v-if="page != 1" id="page-prev" class="text-left mr-auto">Prev Page</RouterLink>
      <RouterLink :to="{name: 'studentlist', query: {page: page + 1} }" rel="next" v-if="hasNextPage" id="page-next" class="text-right ml-auto">Next Page</RouterLink>
    </div>
    <form @submit.prevent="addStudent">
          <input v-model="newStudentName" placeholder="Student Name" />
          <input v-model="newStudentSurname" placeholder="Student Surname" />
          <input v-model="newStudentImage" placeholder="Student Image URL" />
          <button type="submit" :disabled="!isFormValid">Add Student</button>
        </form>
    <link href="https://fonts.googleapis.com/css2?family=Concert+One&family=Kanit:wght@600&family=Poiret+One&family=Racing+Sans+One&display=swap" rel="stylesheet">

  </main>
</template>
<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student';
import { ref , computed, type Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useStudentAllStore } from '@/stores/all_student';
const studentStore_all = useStudentAllStore();
const { student_all} = storeToRefs(studentStore_all);
const students: Ref<studentInfo[]> = ref([])
const totalStudent = ref<number>(0)
const newStudentName = ref('');
const newStudentSurname = ref('');
const newStudentImage = ref('');
const props = defineProps({
page: {
    type: Number,
    required: true
  }
})

const isFormValid = computed(() =>
  newStudentName.value.trim() !== '' &&
  newStudentSurname.value.trim() !== '' &&
  newStudentImage.value.trim() !== ''
);

const addStudent = () => {
  if (isFormValid.value) {
    const newStudent = {
      id: student_all.value.length + 1,
      name: newStudentName.value,
      surname: newStudentSurname.value,
      image: newStudentImage.value,
    };

    studentStore_all.pushNewStudent(newStudent);

    newStudentName.value = '';
    newStudentSurname.value = '';
    newStudentImage.value = '';
  }
}

const displayedStudents = computed(() => {
  const startIndex = (props.page - 1) * 3;
  const endIndex = startIndex + 3;
  return student_all.value.slice(startIndex, endIndex);
});

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(student_all.value.length / 3);
  return props.page < totalPages;
});

// Store new students before leaving the page
onBeforeRouteLeave((to, from, next) => {
  if (isFormValid.value) {
    addStudent();
  }
  next();
});

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

.student{
  font-family: 'Poiret One', cursive;
}
</style>