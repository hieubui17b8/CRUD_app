import axios from "./customize-axios"

const fetchAllUser = (page: number) => {
    return axios.get(`/api/users?page=${page}`)
}

const CreateUser = (name: string, job: string) => {
    return axios.post('/api/users', { name, job })
}

export { fetchAllUser, CreateUser };