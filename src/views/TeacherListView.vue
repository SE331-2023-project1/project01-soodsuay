<template>
    <div class="student">
      <TeacherCard
        v-for="teacher in teacher_all"
        :key="teacher.id"
        :teacher="teacher"
      ></TeacherCard>
    </div>
    <!-- Teacher form -->
    <form @submit.prevent="addTeacher">
      <input v-model="newTeacherName" placeholder="Teacher Name" />
      <input v-model="newTeacherSurname" placeholder="Teacher Surname" />
      <input v-model="newTeacherImage" placeholder="Teacher Image URL" />
      <button type="submit" :disabled="!isFormValid">Add Teacher</button>
    </form>
  </template>
  <script lang="ts" setup>
  import TeacherCard from "../components/TeacherCard.vue";
  import type { TeacherInfo } from "@/teacher";
  import TeacherService from "@/services/TeacherService";
  import { ref, computed,type Ref ,onMounted } from "vue";
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";

const teacherStoreAll = useTeacherAllStore();
const { teacher_all} = storeToRefs(
  teacherStoreAll
);

const newTeacherName = ref("");
const newTeacherSurname = ref("");
const newTeacherImage = ref("");

const isFormValid = computed(
  () =>
    newTeacherName.value.trim() !== "" &&
    newTeacherSurname.value.trim() !== "" &&
    newTeacherImage.value.trim() !== ""
);

const addTeacher = () => {
  if (isFormValid.value) {
    const newTeacher = {
      id: teacher_all.value.length + 1,
      teacher_name: newTeacherName.value,
      teacher_surname: newTeacherSurname.value,
      teacher_img: newTeacherImage.value,
    };
    teacherStoreAll.pushNewTeacher(newTeacher);
    newTeacherName.value = "";
    newTeacherSurname.value = "";
    newTeacherImage.value = "";
  }
};

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
  </style>