import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/StudentListView.vue'
import StudentlayoutView from '@/views/student/StudentLayoutView.vue'
import StudentDetailView from '@/views/student/StudentDetailView.vue'
import StudentsInfoServices from '@/services/StudentsInfoServices'
import StudentCommentView from '@/views/student/StudentCommentView.vue'
import StudentAdvisorView from '@/views/student/StudentAdvisorView.vue'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { commentStudent } from '@/stores/comment'
import { commentStudentId } from '@/stores/comment_id'
import TeacherListView from '../views/TeacherListView.vue'
import TeacherDetailView from '../views/TeacherDetailView.vue'
import { ref } from 'vue'

import 'animate.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'studentlist',
      component: StudentView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1') })
    },
    {
      path: '/student/:id',
      name: 'student-layout',
      component: StudentlayoutView,
      props: true,
        beforeEnter: (to) => {
          // <-- put API call here
          const id: number = parseInt(to.params.id as string)
          const studentStore = useStudentStore()
          return StudentsInfoServices.getStudentById(id)
          .then((response) => {
            // need to set up the data for the component
            studentStore.setStudent(response.data)
            const keep_comm = ref([])
            const commentStudents = commentStudent()
            const commentStudent_Id = commentStudentId()
            const { comment } = storeToRefs(commentStudents)
            keep_comm.value = comment.value.filter(
              (commentItem) => id === commentItem.id
            );
            console.log('Filtered comments:', keep_comm.value)
            commentStudent_Id.setComment(keep_comm.value)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            }else{
              return { name: 'network-error'}
            }
          })
        },
      children: [
               {
              path: '',
              name: 'student-detail',
              component: StudentDetailView,
              props: true
            },
            {
              path: '',
              name: 'student-comment',
              component: StudentCommentView,
              props: true
            },
            {
              path: '',
              name: 'student-advisor',
              component: StudentAdvisorView,
              props: true
            },
            // {
            //   path: 'layout',
            //   name: 'student-layout',
            //   props: true,
            //   component: StudentlayoutView
            // },
      ]
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherListView
      },
      {
      path: '/teacher/:id',
      name: 'teacher-detail',
      component: TeacherDetailView,
      props:true
      }
  ]
})

export default router
