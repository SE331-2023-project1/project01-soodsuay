<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 3.5rem;
  position: relative;
  top: 25px;
  font-family: cursive;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1 {
  color: rgb(49, 86, 197);
}
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
