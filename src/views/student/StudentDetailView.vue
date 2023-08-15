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
    <img :src="props.student?.image" class="image" />
    <h1>{{ props.student?.name }} {{ props.student?.surname }}</h1>
    <h2>nickname : {{ props.student?.nickname }}</h2>
    <h2 v-if="props.student?.course_list.length>0">Courses :</h2>
    <h2 v-for="course in props.student?.course_list" :key="course.course_id">
      ★ {{ course.course_name }}
    </h2>
    <h2>☏ {{ props.student?.gmail }}</h2>
    <div class="image-container">
  </div>
  </div>
</div>
</template>

<style scoped>
.box-student {
  background-color: white;
  width: 80%; /* Adjust width */
  max-width: 600px;
  height: 90%;
  margin: 0 auto; /* Center the box horizontally */
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.image {
  width: 220px;
  height: 300px; /* Adjust height */
  border-radius: 15%;
  border: 4px solid rgb(102, 140, 255);
}

h1 {
  font-family: 'Rubik', sans-serif;
  margin: 10px 0;
  color: #333;
  font-size: 25px;
}
h2 {
  font-family: 'Rubik', sans-serif;
  margin: 10px 0;
  color: #333;
  font-size: 15px;
  text-align: left;
}


@media (min-width: 768px) {
  .box-student {
    width: 100%; /* Adjust width */
    padding: 30px; /* Increase padding */
  }

  .image {
    width: 280px; /* Increase width */
    height: 380px; /* Increase height */
  }
}
</style>