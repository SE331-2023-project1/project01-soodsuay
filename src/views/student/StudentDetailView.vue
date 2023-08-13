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
  <div v-if="props.student">
    <h1>{{ props.student?.name }} {{ props.student?.surname }}</h1>
    <h2>nickname : {{ props.student?.nickname }}</h2>
    <h2>Courses :</h2>
    <!-- <h2 v-for="course in props.student?.course_list" :key="course.id"> ★ {{ course.course_name }}</h2> -->
    <h2 v-for="course in props.student?.course_list" :key="course.course_id">
      ★ {{ course.course_name }}
    </h2>
    <h2>☏ {{ props.student?.gmail }}</h2>
    <img :src="props.student?.image" class="image" />
  </div>
</template>

<style scoped>
.image {
  width: 350px;
  height: 450px;
  align-items: center;
  border-radius: 15%;
  margin-top: 3%;
  border: 4px solid rgb(255, 250, 102);
}

h1 {
  font-family: Georgia, serif;
}

h2 {
  font-family: Georgia, serif;
}
</style>
