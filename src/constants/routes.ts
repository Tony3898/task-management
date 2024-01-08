import Dashboard from "../pages/dashboard.tsx";
import Error from "../pages/error.tsx";
import PageNotFound from "../components/misc/pageNotFound.tsx";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';
import TaskIcon from '@mui/icons-material/Task';
import Task from "../pages/task.tsx";

export const allRoute = [
    {
        element: Dashboard,
        icon: DashboardIcon,
        index: true,
        path: "/",
        showInMenu: true,
        text: 'Dashboard'
    },
    {
        element: Task,
        icon: TaskIcon,
        index: true,
        path: "/all-task",
        showInMenu: true,
        text: 'All Tasks'
    },
    {
        element: Error,
        icon: ErrorIcon,
        path: "/error",
        showInMenu: false,
        text: 'Error'
    },
    {
        element: PageNotFound,
        icon: ErrorIcon,
        path: "*",
        showInMenu: false,
        text: 'Page Not Found'
    }
]