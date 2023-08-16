<template>
    <div class="box-comment" >
      <div clss="commentform">
        <form @submit.prevent="addComment">
          <label class="font-bold" for="name">Comment</label>
          <input class="border-2 rounded-2xl border-blue-300 mt-5 p-2" v-model="comment_input" type="text" id="name" required>
          <button class="button-19" type="submit">Add Comment</button>
        </form>
      </div>
      <div v-for="(commentItem, index) in keepCommt_id" :key="index">
        <p class="comment-item">
        <strong class="font-bold">Comment Number {{ index + 1 }} :</strong> {{ commentItem.comment }}
      </p>      
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { commentStudent } from '@/stores/comment';
  import { commentStudentId } from '@/stores/comment_id';
  import type { commmentInfo } from '@/comment'
  import { type studentInfo } from '@/student';
  import type { PropType } from 'vue';
  
  const props = defineProps({
    student: {
      type: Object as PropType<studentInfo>,
      required: true,
    },
  });
  
  const comment_input = ref<string>('');
  const keep_comm = ref<commmentInfo[]>([]);
  const keepCommt_id = ref<commmentInfo[]>([]);
  const commentStudents = commentStudent();
  const commentStudent_Id = commentStudentId();
  const { comment } = storeToRefs(commentStudents);
  const { comment_id } = storeToRefs(commentStudent_Id);
  
  // Fetch comments when the component is created
  onMounted(() => {
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student.id === commentItem.student_id // Fix this line
    );
    commentStudent_Id.setComment(keep_comm.value);
    keepCommt_id.value = comment_id.value;
  });
  
  const addComment = () => {
    const formatComment = {
    id:0,
      student_id: props.student.id, // Update id to student_id
      comment: comment_input.value,
    };
    commentStudents.pushComment(formatComment);
  
    // Update the filtered comments
    keep_comm.value = comment.value.filter(
      (commentItem) => props.student.id === commentItem.student_id // Fix this line
    );
    commentStudent_Id.setComment(keep_comm.value);
  
    // Update keepCommt_id with the latest filtered comments
    keepCommt_id.value = comment_id.value;
  
    // Clear the input field
    comment_input.value = '';
  };
  </script>
  <style scoped>
  .box-comment {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

  .button-19 {
    margin-top: 10px;
    width: 100px;
  appearance: button;
  background-color: #1899D6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: din-round,sans-serif;
  /* font-size: 15px;
  font-weight: 700;
  letter-spacing: .8px; */
  line-height: 20px;
  outline: none;
  /* padding: 13px 16px;
  text-align: center;
  text-transform: uppercase; */
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  /* width: 40%; */
  margin-left: 280px;
  height: 40px;
}

.button-19:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.button-19:main,
.button-19:focus {
  user-select: auto;
}

.button-19:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

.button-19:disabled {
  cursor: auto;
}
input {
  /* border-radius: 15px;
  border: 3px solid #1899D6;
  margin-top: 20px;
  padding: 10px; */
  width: 95%;
  /* box-sizing: border-box; */
}

.comment-item {
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}



/* Add more styles as needed */
@media (min-width: 1024px) {
  input {

  width: 100%;

}
.button-19 {
  margin-left: 460px;
}

}
</style>
  

