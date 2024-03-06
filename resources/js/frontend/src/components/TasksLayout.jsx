import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function TasksLayout() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            TasksLayout
            <Outlet />
        </div>
    )
}