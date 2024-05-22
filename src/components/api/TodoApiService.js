import axios from "axios";

const apiCLient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retrieveAllTodosByUsernameApi
    = (username) => apiCLient.get(`/users/${username}/todos`)

export const retrieveTodoOfUsernameByIdApi
    = (username, id) => apiCLient.get(`/users/${username}/todos/${id}`)

export const deleteTodoOfUsernameByIdApi
    = (username, id) => apiCLient.delete(`/users/${username}/todos/${id}`)

export const UpdateTodoOfUsernameByIdApi
    = (username, id, todo) => apiCLient.put(`/users/${username}/todos/${id}`, todo)

export const addTodoByUsernameApi
    = (username, todo) => apiCLient.post(`/users/${username}/todos`, todo)
