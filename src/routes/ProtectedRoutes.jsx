import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {

    const { fullname } = useSelector(s => s.state);

    if (!fullname) {
        return <Navigate to='/dashboard' replace />
    }

    return <Outlet />
}