import { Navigate, Outlet } from 'react-router-dom'
const isAuthenticated = () => !!localStorage.getItem("access_token")

export default function PrivateRouter({redirectto = '/login'}){
    return isAuthenticated() ? <Outlet/> : <Navigate to={redirectto} replace/>                   // navigate(redirectto)
}
