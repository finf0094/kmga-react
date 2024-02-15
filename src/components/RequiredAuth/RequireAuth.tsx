import React from 'react'
import useAuth from '../../hooks/useAuth.ts';
import {Outlet, Navigate} from "react-router-dom";

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({allowedRoles}) => {
    const auth = useAuth()

    return auth?.user?.roles?.find((role: string) => allowedRoles?.includes(role)) ? <Outlet/> : <Navigate to="/login" />
}


export default RequireAuth