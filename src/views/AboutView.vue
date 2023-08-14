<template>
  <div>
    <select v-model="selectedForm" id="formSelect">
      <option value="student">Student Form</option>
      <option value="teacher">Teacher Form</option>
    </select>
  </div>
    <div v-if="selectedForm === 'student'">
      <h1>Add new student form</h1>
      <form @submit.prevent="addStudent">
        <input v-model="newStudentName" placeholder="Student Name" />
        <input v-model="newStudentSurname" placeholder="Student Surname" />
        <input v-model="newStudentNickname" placeholder="Student Nickname" />
        <input v-model="newStudentGmail" placeholder="Student Gmail" />
        <input v-model="newStudentImage" placeholder="Student Image URL" />
        <input v-model="newStudentTeacher" type="number" placeholder="Teacher ID" />
        <button class="button-52" type="submit" :disabled="!isFormValid">Add Student</button>
      </form>
    </div>
    <div v-if="selectedForm === 'teacher'">
      <div class="from">
        <h1>Add new teacher form</h1>
    <form @submit.prevent="addTeacher">
      <input class="teachername" v-model="newTeacherName" placeholder="Teacher Name" />
      <input class="teachersurname" v-model="newTeacherSurname" placeholder="Teacher Surname" />
      <input class="teacherlink" v-model="newTeacherImage" placeholder="Teacher Image URL" />
      <input class="teacherlink" v-model="newTeacherPosition" placeholder="Teacher Position" />
      <input class="teacherlink" v-model="newTeacherEmail" placeholder="Teacher Email" />
      <select v-model="newTeacherEducation" id="formSelect" placeholder="Teacher Education">
      <option value="Bachelor's degree">Bachelor's degree</option>
      <option value="Master Degrees">Master Degrees</option>
      <option value="Doctoral Degrees">Doctoral Degrees</option>
    </select>
      <button class="button-52" type="submit" :disabled="!isFormValidTeacher">Add Teacher</button>
    </form>
</div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, type Ref, onMounted } from 'vue'
import type { studentInfo } from '@/student'
import { storeToRefs } from 'pinia'
import { useStudentAllStore } from '@/stores/all_student'
import router from '@/router';
import { useTeacherAllStore } from "@/stores/all_teacher";

const teacherStoreAll = useTeacherAllStore();
const { teacher_all } = storeToRefs<typeof teacherStoreAll>(teacherStoreAll)

const newTeacherName = ref("");
const newTeacherSurname = ref("");
const newTeacherImage = ref("");
const newTeacherPosition = ref("");
const newTeacherEmail = ref("");
const newTeacherEducation = ref("Bachelor's degree");


const studentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(studentStore_all)
const newStudentName = ref('')
const newStudentSurname = ref('')
const newStudentImage = ref('')
const newStudentTeacher = ref()
const newStudentNickname = ref()
const newStudentGmail = ref()
const selectedForm = ref('student')

const isFormValidTeacher = computed(
  () =>
    newTeacherName.value.trim() !== "" &&
    newTeacherSurname.value.trim() !== "" &&
    newTeacherImage.value.trim() !== ""
);

const addTeacher = () => {
  if (isFormValidTeacher.value) {
    const newTeacher = {
      id: teacher_all.value.length + 1,
      teacher_name: newTeacherName.value,
      teacher_surname: newTeacherSurname.value,
      teacher_img: newTeacherImage.value,
      position :newTeacherPosition.value,
      email:newTeacherEmail.value,
      education:newTeacherEducation.value
    };
    teacherStoreAll.pushNewTeacher(newTeacher);
    newTeacherName.value = "";
    newTeacherSurname.value = "";
    newTeacherImage.value = "";
    newTeacherPosition.value = "";
    newTeacherEmail.value = "";
    newTeacherEducation.value = "Bachelor's degree";
  }
};




const isFormValid = computed(
  () =>
    newStudentName.value.trim() !== '' &&
    newStudentSurname.value.trim() !== '' &&
    newStudentImage.value.trim() !== ''
)

const addStudent = () => {
  if (isFormValid.value) {
    const newStudent = {
      id: student_all.value.length + 1,
      name: newStudentName.value,
      surname: newStudentSurname.value,
      image: newStudentImage.value,
      teacher_id: newStudentTeacher.value,
      course_list: [],
      comment: [],
      student_id: student_all.value.length + 1,
      major: '',
      year: 0,
      gender: '',
      gmail: newStudentGmail.value,
      nickname: newStudentNickname.value
    }

    studentStore_all.pushNewStudent(newStudent)
    
    newStudentName.value = ''
    newStudentSurname.value = ''
    newStudentImage.value = ''
    newStudentTeacher.value = 0
    newStudentGmail.value = ''
    newStudentNickname.value = ''
  }
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
