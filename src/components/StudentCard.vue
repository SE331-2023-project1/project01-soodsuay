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
            <h2>Name: {{ props.student?.name }}</h2>
            <h2>Surname: {{ props.student?.surname }}</h2>
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
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 2.5px solid rgb(255, 251, 0);
  margin-bottom: 30px;
  text-align: center;
  border-radius: 10%;
  color: #ffffff;
  background-color: rgb(167, 197, 255);
  font-size: 16px;
}

.image {
  width: 210px;
  height: 270px;
  align-items: center;
}

.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}

h2 {
  font-family: 'Poiret One', cursive;
}
</style>
