<template>

    <RouterLink class="teacher-link" :to="{name: 'teacher-detail', params:{id: teacher?.id}}">
        <div class="teacher-class">
            <div class="teacher-card">

                <img :src="teacher?.teacher_img" class="image" ><br>
                <span>Teacher id: {{ teacher?.id }}</span>
                <h4>Name: {{ teacher?.teacher_name }} {{ teacher?.teacher_surname }} </h4>

            </div>
        </div>
    </RouterLink>
</template>
<script setup lang="ts">
import type { TeacherInfo } from '@/teacher'
import type { PropType } from 'vue';
const props = defineProps({
    teacher: {
        type: Object as PropType<TeacherInfo>,
            require: true
    }
})
</script>

<style scoped>
.teacher-card{
    padding: 20px;
    width: 280px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
    text-align: center;
}
.teacher-card:hover{
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.teacher-link{
    color: #2c3e50;
    text-decoration: none;
}
.image{
    width: 236px;
    height: 246px;
    align-items: center;
}
</style>