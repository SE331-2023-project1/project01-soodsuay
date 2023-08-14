<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
import TeacherServices from "@/services/TeacherService";
import { useTeacherAllStore } from "@/stores/all_teacher";
import StudentService from '@/services/StudentsInfoServices'
import { useStudentAllStore } from '@/stores/all_student'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';

const store = useMessageStore()
const { message } = storeToRefs(store)
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
    <div class=".app-container">
      <header>
    <link href="https://fonts.googleapis.com/css2?family=Concert+One&family=Kanit:wght@600&family=Poiret+One&family=Racing+Sans+One&display=swap" rel="stylesheet">    <div class="wrapper">
     <div class="container-logo">
      <img alt="Vue logo" class="logo" src="@/assets/image/789.jpg" />
      <h1 class="text" >789 School</h1>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/teacher">Teacher list</RouterLink>
      <RouterLink to="/about">Add person data</RouterLink>
 
    </nav>
     </div>
   
    </div>
    <div id="flashMessage" v-if="message">
      <h4> {{ message }} </h4>
    </div>
  </header>
    </div>

 
  <RouterView />
</template>

<style scoped>

header {
  line-height: 1.3;
  max-height: 95vh;
  /* margin-right: 8rem; */

}
.logo {
  width: 500px;
  height: 250px;
}

.container-logo {
    width: fit-content;
    height: fit-content;
    align-items: center;
    margin-top: 100px;
}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
  margin-right: 8rem;
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
h4{
  color: white;
}
@keyframes yellowfade{
  from{
    background: blue;
  }
  to {
    background: transparent;
  }
}

#flashMessage{
  animation: yellowfade 2s ease-in-out;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 8);
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin-right: 2rem;
  }

  nav {
    text-align: right;
    margin-left: -2rem;
    max-width: -1rem;
    font-size: 1.2rem;
    padding: 1rem 0;
    margin-top: 0.5rem;
  }
  
}
</style>
