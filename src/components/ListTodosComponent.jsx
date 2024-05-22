import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { deleteTodoOfUsernameByIdApi, retrieveAllTodosByUsernameApi, updateTodoOfUsernameByIdApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const authContext = useAuth()
    const username = authContext.username

    useEffect (
        () => refreshTodos(), []
    )

    function refreshTodos() {
        retrieveAllTodosByUsernameApi(username)
        .then(response => {
                setTodos(response.data)
            }
        )
        .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        deleteTodoOfUsernameByIdApi(username, id)
        .then(
            () => {
                setMessage(`Todo with id ${id} deleted!`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todos/${id}`)
    }

    function addTodo() {
        navigate(`/todos/-1`)
    }

    return (
        <div className="container">
            <h1>Things you want do do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map (
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }    
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-3" onClick={addTodo}>Add Todo</div>
        </div>
    )
}