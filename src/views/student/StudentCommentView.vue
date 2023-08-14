<template>
    <div class="box-comment" >
      <div clss="commentform">
        <form @submit.prevent="addComment">
          <label for="name">Comment:</label>
          <input v-model="comment_input" type="text" id="name" required>
          <button class="button-19" type="submit">Add Comment</button>
        </form>
      </div>
      <div v-for="(commentItem, index) in keepCommt_id" :key="index">
        <p class="commentItem">
        <strong>Comment Number {{ index + 1 }} :</strong> {{ commentItem.comment }}
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
  width: 133.5%;
  height: 117%;
  align-items: center;
  border-radius: 4%;
  text-align: center;
}

  .button-19 {
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
  margin-left: 2px;
  height: 35px;
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
input{
  border-radius: 15px;
  border-color: #1899D6;
  margin-top: 20px;
  border-width: 3px;
}
label{
  padding-right: 20px;
  font-weight: bold;
}
.commentItem{
  background-color: #FFFFFF;
  border-radius: 5px;
  height: 30px;
  margin-top: 10px;
}
.commentItem strong {
  font-weight: bold;
}


</style>