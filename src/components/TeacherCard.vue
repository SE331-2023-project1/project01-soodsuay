<template>
    <RouterLink class="teacher-link" :to="{ name: 'teacher-detail', params: { id: teacher?.id } }">
      <div class="animate__animated animate__fadeInLeftBig">
      <div class="teacher-card">
        <div class="teacher-image">
          <img :src="teacher?.teacher_img" class="image" /><br>
        </div>
        <div class="teacher-info">
          <span class="teacher-id">Teacher id: {{ teacher?.id }}</span>
          <h4 class="teacher-name">{{ teacher?.teacher_name }} {{ teacher?.teacher_surname }}</h4>
        </div>
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
          required: true
      }
  })
  </script>
  
  <style scoped>
  .teacher-card {
    display: flex;
    padding: 20px;
    width: 400px;
    cursor: pointer;
    margin-bottom: 30px;
    text-align: left;
    border: 2.5px solid rgb(255, 255, 100);
    background-color: rgb(173, 205, 255);
    border-radius: 10px;
  }
  
  .teacher-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .teacher-image {
    flex: 0 0 35%; /* Adjust image width */
    padding: 10px;
    margin-bottom: 5px;
    margin-inline-end: 5%;
    text-align: center;
  }
  
  .image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .teacher-info {
    flex: 1; /* Take up remaining space */
  }
  
  .teacher-name {
    font-size: 1.3rem;
    margin: 0;
    font-family: 'Poiret One', cursive;
    color: rgb(255, 255, 255);
    font-size: 250;
  }
  
  .teacher-id {
    color: #ffffff;
    font-size: 0.9rem;
    font-family: 'Poiret One', cursive;
  }
  </style>
  