import { defineStore } from 'pinia'
import type { commmentInfo } from '@/comment'
export const commentStudentId = defineStore('comment_id', {
    state: () => ({
        comment_id: [] as commmentInfo[]
    }),
    actions: {
        setComment(comment : commmentInfo[]){
            this.comment_id=comment
        }
    }
})