export interface studentInfo {
  id: number
  name: string
  surname: string
  image: string
  course_list: Course[]
  comment: Comment[]
  teacher_id: number
  student_id: number
  major: string
  year: number
  gender: string
  gmail: string
  nickname: string
}
export interface Course {
  course_id: number
  course_name: string
}
export interface Comment {
  id: number
  comment: string
}
