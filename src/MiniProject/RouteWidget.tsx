import './css/style.css'
import './css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import ProtectedRoute from './ProtectedRoute'
import { useSelector } from 'react-redux'

export default function RouteWidget() {
  //@ts-ignore
  const User = useSelector(state => state.userRedux);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={User.isLoggedIn ? <Navigate to="/dashboard" replace /> : <Dashboard />} />
        <Route path="/" element={<ProtectedRoute />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
