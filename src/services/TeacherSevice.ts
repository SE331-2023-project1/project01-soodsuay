import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { TeacherInfo } from '@/teacher'

const apiClient : AxiosInstance = axios.create({
    baseURL: 'http://localhost:3004',
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