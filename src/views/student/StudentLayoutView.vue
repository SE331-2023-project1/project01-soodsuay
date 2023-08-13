<script setup lang="ts">
import {ref} from 'vue'
import StudentsInfoServices from '@/services/StudentsInfoServices'
import type { Ref } from 'vue'
import { type studentInfo } from '@/student'
import {useRouter} from 'vue-router';
import { storeToRefs } from 'pinia';
import { useStudentStore } from '@/stores/student';
import { useStudentAllStore } from '@/stores/all_student';
const StudentStore = useStudentStore()
const StudentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(StudentStore_all)
const { student } = storeToRefs(StudentStore)
console.log(student_all.value)
const keep_id = props.id
const keep = student_all.value[keep_id-1]
console.log(keep)
StudentStore.setStudent(keep)

const props = defineProps({
    id: String
})

const router = useRouter()
// StudentsInfoServices.getStudentById(Number(props.id)).then((response) => {
//         student.value = response.data

//     }).catch(error =>{
//         console.log(error)
//         if(error.response && error.response.status === 404){
//             router.push({name:'404-resource',params: {resource: 'event'}})
//         }else{
//             router.push({name:'network-error'})
//         }
//     })

</script>
<template>
    <link href="https://fonts.googleapis.com/css2?family=Concert+One&family=Kanit:wght@600&family=Racing+Sans+One&display=swap" rel="stylesheet">
    <div v-if="student">
        <div id="nav">
            <router-link :to="{name: 'student-detail', params:{id}}">Student Details</router-link> | 
            <router-link :to="{name: 'student-advisor', params:{id}}">Teacher</router-link> |
            <router-link :to="{name: 'student-comment', params:{id}}">comment</router-link>
        </div>
        <!-- <h1>Student List</h1> -->

        <router-view :student="student"></router-view>
    </div>
</template>

<style>

</style>