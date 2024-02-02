import {Route, Routes} from "react-router-dom"
import {AuthSuccess, Layout, Login, RequireAuth} from "@components";
import {DashboardPage} from "@pages";
import {Roles} from "@interfaces";

function App() {

    console.log(`
    ################################################
      🛡️  Server api on: ${import.meta.env.VITE_API_URL} 🛡️
      ################################################
    `)

    return (
        <div className="app">
            <Routes>

                <Route path="/" element={<Layout/>}>

                    {/* default */}
                    <Route path="login" element={<Login/>}/>
                    <Route path="auth/success" element={<AuthSuccess/>}/>

                    {/* for admin or authorized user */}
                    <Route element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]}/>}>
                        <Route path="dashboard" element={<DashboardPage/>}/><Route/>
                    </Route>

                </Route>

            </Routes>
        </div>
    )
}

export default App
