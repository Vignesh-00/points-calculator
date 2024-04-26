import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";

const ProtectedRoute = ({ ...rest }) => {
    //@ts-ignore
    const User = useSelector(state => state.userRedux);
    return (
        User.isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
    )
}

export default ProtectedRoute;