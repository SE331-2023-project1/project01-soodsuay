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
        <button class="button-19" type="submit" :disabled="!isFormValid">Add Student</button>
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
      <button class="button-19" type="submit" :disabled="!isFormValidTeacher">Add Teacher</button>
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
import { useMessageStore } from '@/stores/message'

const store = useMessageStore()
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
    store.updateMessage('New teacher has been added')
    setTimeout(() => {
      store.resetMessage()
    }, 2000)

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
    store.updateMessage('New student has been added')
    setTimeout(() => {
      store.resetMessage()
    }, 2000)


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
<style scoped>
.box-comment {
  background-color: white;
  width: 133.5%;
  height: 98.5%;
  align-items: center;
  border-radius: 4%;
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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

}
</style>
