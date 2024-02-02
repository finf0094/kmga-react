import {Route, Routes} from "react-router-dom"
import {Layout, Login} from "@components";
import {DashboardPage} from "@pages";
import {RequireAuth} from "@components/RequiredAuth";
import {Roles} from "@interfaces";

function App() {

    console.log(`
    ################################################
      🛡️  Server starts on mode: ${import.meta.env.VITE_NODE_ENV} 🛡️
      ################################################
    `)

    return (
        <div className="app">
            <Routes>

                <Route path="/" element={<Layout/>}>

                    {/* default */}
                    <Route path="login" element={<Login/>}/>


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
