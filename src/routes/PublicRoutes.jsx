import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
    const { fullname } = useSelector(s => s.state);

    if (!fullname) { 
        return <Outlet />
    }

    return <Navigate to='/' replace />
}