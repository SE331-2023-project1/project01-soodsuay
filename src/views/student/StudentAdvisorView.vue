<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { TeacherInfo } from '@/teacher';
import type { studentInfo } from '@/student';
import { useTeacherAllStore } from '@/stores/all_teacher';
import { storeToRefs } from 'pinia';

const props = defineProps({
  student: {
    type: Object as PropType<studentInfo>,
    required: true,
  },
});

const teacherStoreAll = useTeacherAllStore();
const { teacher_all } = storeToRefs(teacherStoreAll);

const teacher = ref<TeacherInfo | null>(null);
const teacherId = props.student.teacher_id;

// Find the teacher with the matching id
const foundTeacher = teacher_all.value.find((teacher) => teacher.id === teacherId);

// Assign the found teacher to the 'teacher' ref, or null if not found
if (foundTeacher) {
  teacher.value = foundTeacher;
} else {
  teacher.value = null;
}

console.log(teacher);
</script>
<template>
  <div class="box-Advisor">
  <br><br><br>
  <div v-if="teacher">
    <img :src="teacher.teacher_img" class="image" />
    <br>
    <h1> {{ teacher.teacher_name }} {{ teacher.teacher_surname }} </h1>
    <h3 class="id">Teacher ID: {{ teacher.id }}</h3>
        <h3 class="position">Position: {{ teacher.position }}</h3>
        <h3 class="education">Education ♕ {{ teacher.education }}</h3>
        <h3 class="email">Email ☏ {{ teacher.email }}</h3>
  </div>
</div>
</template>
<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box-Advisor {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* Increase width */
  height: 90%;
  max-width: 600px;
  margin: 0 auto; /* Center the box horizontally */
  text-align: center;
}

.image-container {
  position: relative;
  margin-bottom: 20px;
}

.image {
  width: 220px;
  height: 240px;
  border-radius: 50%;
  border: 4px solid rgb(102, 140, 255);
}

.teacher-details {
  font-family: 'Rubik', sans-serif;
}

h1 {
  font-size: 1.8rem; /* Increase font size */
  font-weight: bold;
  margin-top: 15px;
  color: #333;
}

.position {
  font-size: 1.2rem; /* Increase font size */
  margin-top: 10px;
  color: #777;
}

.education, .email {
  font-size: 1rem; /* Increase font size */
  margin-top: 5px;
  color: #555;
}
.id{
  font-size: 1.2rem; /* Increase font size */
  margin-top: 7px;
  color: #777;
}
@media (min-width: 768px) {
  .image {
    width: 250px; /* Increase width */
    height: 270px; /* Increase height */
  }
}
</style>