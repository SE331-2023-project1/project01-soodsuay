<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TeacherInfo } from '@/teacher'
import TeacherService from '@/services/TeacherService';
import TeacherListView from '../views/TeacherListView.vue'
import TeacherDetailView from '../views/TeacherDetailView.vue'
const teacher = ref<TeacherInfo | null> (null)
const props = defineProps({
    id: String
})
TeacherService.getTeacherByID(Number(props.id)).then((response) => {
    teacher.value = response.data
}).catch(error => {
        console.log(error)
    })

</script>
<template>
  
    <header>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Noto+Sans+SC:wght@700&family=Oxygen&family=Raleway:wght@100;200;700&family=Roboto+Slab:wght@500;700&family=Rowdies:wght@300&family=Rubik:wght@500&display=swap" rel="stylesheet">
    <br>
    <div v-if="teacher">
        <img :src="teacher?.teacher_img" class="image" ><br>
        <h1>{{ teacher.teacher_name }} {{ teacher.teacher_surname }}</h1>
        <h3>Position: {{ teacher.position }}</h3>
        <h3>Education ♕ {{ teacher.education }}</h3>
        <h3>Email ☏ {{ teacher.email }}</h3>


    </div>
</header>
</template>
<style scoped>
.image{
    width: 236px;
    height: 246px;
    align-items: center;
    border-radius: 300px;

}
h1{
    font-weight: bold ;
    font-family: Georgia, serif;

}
h3{
  font-weight: 400 ;
  font-family: 'Oxygen', sans-serif;
}
header {
  line-height: 1.8;
  max-height: 10vh;
}

.image {
  display: block;
  margin: 0 auto 2rem;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .image {
    margin: 0 2rem 0 0;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 8rem;
    margin-left: 10px;
    border: 4px solid rgb(255, 250, 102);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}

</style>