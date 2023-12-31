import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios' 
import type { studentInfo } from '@/student'

const apiClient : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{
    // getStudent(perPage: number, page: number): Promise<AxiosResponse<studentInfo[]>> {
    //     return apiClient.get<studentInfo[]>('/students?_limit=' + perPage + '&_page=' + page)
    // },
    getStudentById(id: number): Promise<AxiosResponse<studentInfo>>{
        return apiClient.get<studentInfo>('students/' + id.toString())
    },
    getStudent(): Promise<AxiosResponse<studentInfo[]>>{
        return apiClient.get<studentInfo[]>('/students')
    },
}