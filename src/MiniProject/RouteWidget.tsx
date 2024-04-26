import './css/style.css'
import './css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Dashboard from '.'
import ProtectedRoute from './ProtectedRoute'
import { useSelector } from 'react-redux'
import { UpdateData } from './UpdateData'
import Register from './Register'

export default function RouteWidget() {
  //@ts-ignore
  const User = useSelector(state => state.userRedux);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={User.isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/viewdata' element={<UpdateData />} />

        </Route>
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
