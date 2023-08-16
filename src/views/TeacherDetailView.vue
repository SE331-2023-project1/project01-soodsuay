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
        <img :src="teacher?.teacher_img" class="items-center rounded-3xl" ><br>
        <h1 class="mt-15 text-gray-800 text-3xl font-bold" >{{ teacher.teacher_name }} {{ teacher.teacher_surname }}</h1>
        <h3 class="text-xl text-gray-500">Teacher ID: {{ teacher.id }}</h3>
        <h3 class="text-xl text-gray-400">Position: {{ teacher.position }}</h3>
        <h3 class="text-xl text-gray-400">Education ♕ {{ teacher.education }}</h3>
        <h3 class="text-xl text-gray-400">Email ☏ {{ teacher.email }}</h3>
      </div>

    </div>
  </div>
</header>
</template>
<style scoped>
.box-teacher {
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 80%; 
  max-width: 600px;
  margin: 0 auto; 
  text-align: center;
}

.image-container {
  position: relative;
  margin-bottom: 20px;
}

/* .image { */
  /* width: 220px;
  height: 240px;
  border-radius: 50%;
  border: 4px solid rgb(102, 140, 255);
} */

/* .teacher-details { */
  /* font-family: 'Rubik', sans-serif;
} */

/* h1 { */
  /* font-size: 1.8rem; 
  font-weight: bold;
  margin-top: 15px;
  color: #333;
} */
@media (min-width: 768px) {
}
</style>