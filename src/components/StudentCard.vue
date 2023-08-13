<template>
    <RouterLink class="event-link" :to="{name: 'student-detail', params:{id: student.id}}">
     <div class="student-class">

       <div class="student-card">
        <h2>Name : {{ props.student?.name  }}</h2>
        <h2>Surname : {{ props.student?.surname }}</h2>
        <img :src="student.image" class="image" />
       </div>
     </div>
    </RouterLink>
   </template>
   
   <script setup lang="ts">
   import type { studentInfo } from '@/student'
   import type { PropType } from 'vue'
   const props = defineProps({
    student: {
           type: Object as PropType<studentInfo>,
           require: true
       }
   })
   </script>
   
   <style scoped>
   .student-card {
     padding: 20px;
     width: 250px;
     cursor: pointer;
     border: 2.5px solid hwb(299 51% 11%);
     margin-bottom: 30px;
     text-align: center;
     font-family: cursive;
     border-radius: 10%;
     color: #334455;
   }
   .image{
    width: 210px;
    height: 270px;
    align-items: center;
}
   .event-card:hover {
     transform: scale(1.01);
     box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
   }
   
   .event-link{
     color: #2c3e50;
     text-decoration: none;
   }
   
   </style>