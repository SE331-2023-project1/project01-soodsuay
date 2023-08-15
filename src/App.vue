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
      <img alt="Vue logo" class="logo" src="@/assets/image/7891.jpg" />
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
}

.logo {
  width: 300px;
  height: 150px;
}

.container-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

nav {
  font-size: 17px;
  text-align: center;
  margin-top: 1rem;
  font-family: 'Concert One', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a.router-link-exact-active {
  color:red;
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
}
.card-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px; /* Adjust spacing between rows */
}

.card-row .student {
  width: 48%; /* Adjust card width */
}

h4 {
  color: white;
}

@keyframes yellowfade {
  from {
    background: blue;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 2s ease-in-out;
}

@media (min-width: 1024px) {
  .container-logo{
    margin-top: 200px;
  }
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 8);
    margin-bottom: 200px;
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
    margin-right: 2rem;
  }

  nav {
    text-align: center;
    max-width: -1rem;
    padding: 1rem 0;
    font-size: 20px;
  }
}
</style>