<script setup lang="ts">
import {ref} from 'vue'
import StudentsInfoServices from '@/services/StudentsInfoServices'
import type { Ref } from 'vue'
import { type studentInfo } from '@/student'
import {useRouter} from 'vue-router';
import { storeToRefs } from 'pinia';
import { useStudentStore } from '@/stores/student';
import { useStudentAllStore } from '@/stores/all_student';

const props = defineProps({
    id: {
        type: String,
    required: true
    }
})
const StudentStore = useStudentStore()
const StudentStore_all = useStudentAllStore()
const { student_all } = storeToRefs(StudentStore_all)
const { student } = storeToRefs(StudentStore)
console.log(student_all.value)
const keep_id = Number(props.id);
const keep = student_all.value[keep_id-1]
console.log(keep)
StudentStore.setStudent(keep)
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
    <link href="https://fonts.googleapis.com/css2?family=Bellota+Text:wght@700&family=Caveat:wght@600&family=Noto+Sans+SC:wght@700&family=Oxygen&family=Plus+Jakarta+Sans:wght@300&family=Racing+Sans+One&family=Raleway:wght@100;200;700&family=Roboto+Slab:wght@500;700&family=Rowdies:wght@300&family=Rubik:wght@500&display=swap" rel="stylesheet">
    <div v-if="student">
        <div class="flex justify-center mt-10 border-3 border-blue-400 bg-yellow-300 border-2 rounded-2xl mb-10 text-gray-700" id="nav-container">
            <nav class="nav-links">
            <router-link :to="{name: 'student-detail', params:{id}}">Student Details</router-link> | 
            <router-link :to="{name: 'student-advisor', params:{id}}">Teacher</router-link> |
            <router-link :to="{name: 'student-comment', params:{id}}">Comment</router-link>
        </nav>
        </div>
        <!-- <h1>Student List</h1> -->

        <router-view :student="student"></router-view>
    </div>
</template>

<style>

.nav-links {
    font-size: 17px;
    text-align: center;
    font-family: 'Bellota Text', cursive;
    font-weight: bold;
    
}

.nav-links a {
    margin: 0 10px;
}

nav a.router-link-exact-active {
    color: red;
    align-items: center;
}

</style>