<script setup lang="ts">
import { type studentInfo } from '@/student'
import type { PropType } from 'vue'
defineProps({
    student: {
        type: Object as PropType<studentInfo>,
            require: true
    }
})

</script>
<template>

            <div v-if="student">
                <h1>{{ student.name }} {{ student.surname }} </h1>
                <h2>Courses :</h2>
                <h2 v-for="course in student.course_list" :key="course.id"> ★ {{ course.course_name }}</h2>
                <img :src="student.image" class="image" />
            </div>

</template>

<style scoped>
.image{
    width: 350px;
    height: 450px;
    align-items: center;
    border-radius: 15%;
}

h1 {
    font-family: Georgia, serif;
}

h2 {
    font-family: Georgia, serif;
}

</style>

