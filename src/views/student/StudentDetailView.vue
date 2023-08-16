<script setup lang="ts">
import { type studentInfo } from '@/student'
import type { PropType } from 'vue'
const props = defineProps({
  student: {
    type: Object as PropType<studentInfo>,
    require: true
  }
})
</script>
<template>
  <div class="box-student">
  <div v-if="props.student">
    <img :src="props.student?.image" class="items-center rounded-3xl border-8 border-blue-300" />
    <h1 class="mt-15 text-gray-800 text-xl font-bold">{{ props.student?.name }} {{ props.student?.surname }}</h1>
    <h2 class="mt-15 text-gray-800 text-base text-left">Nickname : {{ props.student?.nickname }}</h2>
    <h2 class="mt-15 text-gray-800 text-base text-left" v-if="props.student?.course_list.length>0">Courses :</h2>
    <h2  class="mt-15 text-gray-800 text-base text-left" v-for="course in props.student?.course_list" :key="course.course_id">
      ★ {{ course.course_name }}</h2>
      <h2 class="mt-15 text-gray-800 text-base text-left" >☏ {{ props.student?.gmail }}</h2>
    <div class="flex justify-center items-center mb-px-20">
  </div>
  </div>
</div>
</template>

<style scoped>
.box-student {
  background-color: white;
  width: 80%; /* Adjust width */
  max-width: 600px;
  height: 94%;
  margin: 0 auto; /* Center the box horizontally */
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* .image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
} */

/* .image { */
  /* width: 220px;
  height: 300px;
  border-radius: 15%;
  border: 4px solid rgb(102, 140, 255);
  align-items: center; */
/* } */

h1 {
  font-family: 'Rubik', sans-serif;
}
h2 {
  font-family: 'Rubik', sans-serif;
}


@media (min-width: 1024px) {
  .box-student {
    width: 100%; /* Adjust width */
    padding: 30px; /* Increase padding */
    align-items: center;
  }

  /* .image {
    width: 280px;
    height: 380px; 
  } */
}
</style>