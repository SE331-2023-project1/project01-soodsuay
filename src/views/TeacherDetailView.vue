<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { TeacherInfo } from '@/teacher'
import TeacherService from '@/services/TeacherSevice';
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
    <br>
    <div v-if="teacher">
        <img :src="teacher?.teacher_img" class="image" ><br>
        <h1>{{ teacher.teacher_name }} {{ teacher.teacher_surname }}</h1>
        <h3>{{ teacher.position }}</h3>
        <h3>{{ teacher.education }}</h3>
        <h3>{{ teacher.email }}</h3>


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
.h1{
    text-align: center;
    justify-content: center;
    width: 100%;

}
header {
  line-height: 1.5;
  max-height: 5vh;
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
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}

</style>