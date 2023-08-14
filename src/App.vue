<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
import TeacherServices from "@/services/TeacherService";
import { useTeacherAllStore } from "@/stores/all_teacher";
import StudentService from '@/services/StudentsInfoServices'
import { useStudentAllStore } from '@/stores/all_student'
const studentStore_all = useStudentAllStore();
const teacherStoreAll = useTeacherAllStore();

onMounted(async () => {
  try {
    const response = await TeacherServices.getTeacher();
    teacherStoreAll.setTeacherArray(response.data);
  } catch (error) {
    console.error(error);
  }
})

onMounted(async () => {
  try {
    const response = await StudentService.getStudent();
    studentStore_all.setStudentArray(response.data);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/image/789(2).jpg" width="500" height="200" />
    <link href="https://fonts.googleapis.com/css2?family=Concert+One&family=Kanit:wght@600&family=Poiret+One&family=Racing+Sans+One&display=swap" rel="stylesheet">    <div class="wrapper">
      <h1 class="text" >789 School</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/teacher">Teacher list</RouterLink>
        <RouterLink to="/about">Add person data</RouterLink>
       
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.3;
  max-height: 95vh;

}
.logo {
  margin: 0 auto 2rem;
  width: 600px;
  height: 500px;
  

}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin-right: 1rem;
  font-family: 'Concert One', cursive;
}

nav a.router-link-exact-active {
  color:rgb(244, 9, 228);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 10px;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
.text {
  font-family: 'Racing Sans One', cursive;
  font-size: 55px;
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 8);
  }

  .logo {
    margin: 0 3rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: right;
    margin-left: -1rem;
    max-width: -1rem;
    font-size: 1.2rem;
    padding: 1rem 0;
    margin-top: 0.5rem;
  }
  
}
</style>
