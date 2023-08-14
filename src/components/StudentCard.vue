<template>
  <div class="student-list">
    <link
      href="https://fonts.googleapis.com/css2?family=Concert+One&family=Kanit:wght@600&family=Poiret+One&family=Racing+Sans+One&display=swap"
      rel="stylesheet"
    />
    <RouterLink class="event-link" :to="{ name: 'student-detail', params: { id: student.id } }">
      <div class="student-class">
        <div class="animate__animated animate__swing">
          <div class="student-card">
            <h2>{{ props.student?.name }}</h2>
            <h2>{{ props.student?.surname }} </h2>
            <img :src="student.image" class="image" />
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { studentInfo } from '@/student';
import type { PropType } from 'vue';
const props = defineProps({
  student: {
    type: Object as PropType<studentInfo>,
    required: true,
  },
});
</script>

<style scoped>
.student-list {
  display: flex; /* Use flexbox */
  flex-wrap: wrap; /* Allow cards to wrap to the next line */
  justify-content: center; /* Center cards horizontally */
  gap: 20px; /* Gap between cards */
}

.student-card {
  
  padding: 15px;
  width: 250px;
  cursor: pointer;
  
  /* border: 3px solid rgb(59, 54, 147); */
  margin-bottom: 10px;
  text-align: center;
  border-radius: 10%;
  color: #ffffff;
  background-color: rgb(132, 179, 255);
  font-size: 16px;
  box-shadow: 0px 10px 12px rgb(113, 121, 136);

}

.image {
  width: 140px;
  height: 180px;
  border-radius: 2%;
}

.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration:solid;
}

h2 {
  font-family: 'Poiret One', cursive;
}
</style>
