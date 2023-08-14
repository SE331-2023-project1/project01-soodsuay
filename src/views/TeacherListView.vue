<template>
    <div class="student">
      <TeacherCard
        v-for="teacher in teacher_all"
        :key="teacher.id"
        :teacher="teacher"
      ></TeacherCard>
    </div>

  </template>
  <script lang="ts" setup>
  import TeacherCard from "../components/TeacherCard.vue";
  import type { TeacherInfo } from "@/teacher";
  import TeacherService from "@/services/TeacherService";
  import { ref, computed,type Ref ,onMounted } from "vue";
  import { useTeacherAllStore } from "@/stores/all_teacher";
  import { storeToRefs } from 'pinia'
  const teacherStoreAll = useTeacherAllStore();
const { teacher_all } = storeToRefs<typeof teacherStoreAll>(teacherStoreAll)
//   const teachers: Ref<Array<TeacherInfo>> = ref([]);
//     TeacherService.getTeacher().then((response) => {
//     teachers.value = response.data;
//     console.log(teachers.value)
//   });
  </script>
  <style>
  .student {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pagination {
    display: flex;
    width: 290px;
  }
  .pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
  }
  #page-prev {
    text-align: left;
  }
  #page-next {
    text-align: right;
  }


  .button-52 {
  font-size: 16px;
  font-weight: 12;
  letter-spacing: 1px;
  padding: 8px 15px 8px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 95px;

}

.button-52:after {
  content: "";
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.button-52:hover:after {
  top: 0px;
  left: 0px;
}
input{
    height: 40px;
    padding: 20px;
    margin-left: auto;
    margin-bottom: 10px;
}
form{
    display:inline-block;
    width: 400px;
    cursor: pointer;
    text-align: left;
}

@media (min-width: 768px) {
  .button-52 {
    padding: 8px 15px 8px;
  }
}

  </style>