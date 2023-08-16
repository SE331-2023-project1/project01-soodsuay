<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TeacherInfo } from '@/teacher'
import TeacherService from '@/services/TeacherService';
import TeacherListView from '../views/TeacherListView.vue'
import TeacherDetailView from '../views/TeacherDetailView.vue'
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";

const props = defineProps({
    id: String
})
const teacherStoreAll = useTeacherAllStore();
const { teacher_all} = storeToRefs(
  teacherStoreAll
);

console.log(teacher_all.value)
const keep_id = Number(props.id)
const teacher = teacher_all.value[keep_id-1]
console.log(teacher)

</script>
<template>
  
    <header>
      <div class="box-teacher">
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Noto+Sans+SC:wght@700&family=Oxygen&family=Raleway:wght@100;200;700&family=Roboto+Slab:wght@500;700&family=Rowdies:wght@300&family=Rubik:wght@500&display=swap" rel="stylesheet">
    <br>
    <div v-if="teacher">
      <div class="image-container">
        <img :src="teacher?.teacher_img" class="image" ><br>
        <h1>{{ teacher.teacher_name }} {{ teacher.teacher_surname }}</h1>
        <h3 class="id">Teacher ID: {{ teacher.id }}</h3>
        <h3 class="position">Position: {{ teacher.position }}</h3>
        <h3 class="education">Education ♕ {{ teacher.education }}</h3>
        <h3 class="email">Email ☏ {{ teacher.email }}</h3>
      </div>

    </div>
  </div>
</header>
</template>
<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box-teacher {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 80%; /* Increase width */
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