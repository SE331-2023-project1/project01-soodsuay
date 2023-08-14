<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TeacherInfo } from '@/teacher'
import TeacherService from '@/services/TeacherService';
import TeacherListView from '../views/TeacherListView.vue'
import TeacherDetailView from '../views/TeacherDetailView.vue'
import { useTeacherAllStore } from "@/stores/all_teacher";
import { storeToRefs } from "pinia";

const props = defineProps({
    id: String
})
const teacherStoreAll = useTeacherAllStore();
const { teacher_all} = storeToRefs(
  teacherStoreAll
);

console.log(teacher_all.value)
const keep_id = Number(props.id)
const teacher = teacher_all.value[keep_id-1]
console.log(teacher)

</script>
<template>
  
    <header>
      <div class="box-teacher">
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Noto+Sans+SC:wght@700&family=Oxygen&family=Raleway:wght@100;200;700&family=Roboto+Slab:wght@500;700&family=Rowdies:wght@300&family=Rubik:wght@500&display=swap" rel="stylesheet">
    <br>
    <div v-if="teacher">
      <div class="image-containerr">
        <img :src="teacher?.teacher_img" class="image" ><br>
        <h1>{{ teacher.teacher_name }} {{ teacher.teacher_surname }}</h1>
        <h3>Position: {{ teacher.position }}</h3>
        <h3>Education ♕ {{ teacher.education }}</h3>
        <h3>Email ☏ {{ teacher.email }}</h3>
      </div>

    </div>
  </div>
</header>
</template>
<style scoped>
.image{
    width: 240px;
    height: 260px;
    align-items: center;
    border-radius: 400px;
    

}
h1{
  font-size: 25px;
    font-weight: bold ;
    font-family: Georgia, serif;
    text-align: center;

}
h3{
  font-weight: 300 ;
  font-family: cursive;
  text-align: center;
}
header {
  line-height: 2.5;
  max-height: 40vh;
}

.image {
  display:inline;
  margin: 0 auto 8rem;
}
.box-teacher {
  background-color: white;
  width: 500% ;
  height: 314.3%;
  align-items: center;
  padding-left: 45%;
  padding-right: 46.9%;
  padding-top: 15%;
}
.image-containerr {
  justify-content: center;
  align-items: center;
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
    margin-bottom: 20px;
    margin-top: 10rem;
    margin-left: 20px;
    border: 4px solid rgb(255, 250, 102);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}

</style>