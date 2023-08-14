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
    <h3> {{ teacher.position }}</h3>
    <h3>{{ teacher.email }}</h3>
    <h3>{{ teacher.education }}</h3>
  </div>
</div>
</template>
<style scoped>
.image{
  width: 300x;
  height: 250px;
  align-items: center;
  text-align: center;
  border: 4px solid rgb(255, 250, 102);
  border-radius: 49%;
  margin-left: 37%;
}
.box-Advisor {
  background-color: white;
  width: 135% ;
  height: 117%;
  align-items: center;

  margin-bottom: 20px;
    /* margin-left: px; */
    
}

h1 {
  margin-top: 5px;
  text-align: center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

h3 {
  text-align: center;
  font-family:Arial, Helvetica, sans-serif
}
</style>
