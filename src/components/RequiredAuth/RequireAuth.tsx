import React from 'react'
import useAuth from '../../hooks/useAuth.ts';
import {Outlet} from "react-router-dom";

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({allowedRoles}) => {
    const auth = useAuth()

    return (
        auth?.user?.roles?.find((role: string) => allowedRoles?.includes(role)) ? <Outlet/> : <div>Не хватает прав</div>
    )
}


export default RequireAuth