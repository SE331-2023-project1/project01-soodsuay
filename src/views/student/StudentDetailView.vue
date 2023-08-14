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
    <h1>{{ props.student?.name }} {{ props.student?.surname }}</h1>
    <h2>nickname : {{ props.student?.nickname }}</h2>
    <h2 v-if="props.student?.course_list.length>0">Courses :</h2>
    <h2 v-for="course in props.student?.course_list" :key="course.course_id">
      ★ {{ course.course_name }}
    </h2>
    <h2>☏ {{ props.student?.gmail }}</h2>
    <div class="image-container">
    <img :src="props.student?.image" class="image" />
  </div>
  </div>
</div>
</template>

<style scoped>
.image {
  width: 300px;
  height: 400px;
  border-radius: 15%;
  margin-top: 3%;
  border: 4px solid rgb(255, 250, 102);
}

.box-student {
  background-color: white;
  width: 133.5%;
  height: 98.5%;
  align-items: center;
  border-radius: 4%;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: Georgia, serif;
  text-align: center;
}

h2 {
  font-family: Georgia, serif;
  text-align: center;
}
</style>
