import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ListTodosComponent from './ListTodosComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import TodoComponent from './TodoComponent'
import './TodoApp.css'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()

    if(authContext.isAuthenticated) {
        return children
    }

    return <Navigate to = "/login" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/login' element={<LoginComponent />}></Route>

                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>}></Route>

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>}></Route>

                        <Route path='/todos/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>}></Route>

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>}></Route>

                        <Route path='*' element={<ErrorComponent />}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}