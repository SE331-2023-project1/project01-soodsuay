import { defineStore } from 'pinia'
import type { TeacherInfo } from '@/teacher';
export const useTeacherAllStore = defineStore('teacher_all', {
    state: () => ({
        teacher_all:[] as TeacherInfo[]
    }),
    actions: {
        setTeacherArray(teacher : TeacherInfo[]){
            this.teacher_all=teacher
        },
        pushNewTeacher(teacher_all : TeacherInfo){
            this.teacher_all.push(teacher_all)
        }
    }
})