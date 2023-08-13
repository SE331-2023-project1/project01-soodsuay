<template>

    <RouterLink class="teacher-link" :to="{name: 'teacher-detail', params:{id: teacher?.id}}">
        <div class="teacher-class">
            <div class="teacher-card">

                <img :src="teacher?.teacher_img" class="image" ><br>
                <span>Teacher id: {{ teacher?.id }}</span>
                <h4>Name: {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h4>

            </div>
        </div>
    </RouterLink>
</template>
<script setup lang="ts">
import type { TeacherInfo } from '@/teacher'
import type { PropType } from 'vue';
const props = defineProps({
    teacher: {
        type: Object as PropType<TeacherInfo>,
            require: true
    }
})
</script>

<style scoped>
.teacher-card {
  padding: 20px;
  width: 280px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.teacher-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.teacher-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.teacher-info {
  padding: 15px;
}

.teacher-name {
  font-size: 1.1rem;
  margin: 0;
}

.teacher-id {
  color: #888;
  font-size: 0.9rem;
}
</style>