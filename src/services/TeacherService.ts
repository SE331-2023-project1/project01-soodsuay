import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { TeacherInfo } from '@/teacher'

const apiClient : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    getTeacher(): Promise<AxiosResponse<TeacherInfo[]>>{
        return apiClient.get<TeacherInfo[]>('/teachers')
    },
    getTeacherByID(id: number): Promise<AxiosResponse<TeacherInfo>>{
        return apiClient.get<TeacherInfo>('teachers/' +id.toString())
    }
}