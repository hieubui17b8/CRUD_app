import axios from "./customize-axios"

const fetchAllUser = (page: number) => {
    return axios.get(`/api/users?page=${page}`)
}

export { fetchAllUser };