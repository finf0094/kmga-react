import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "@components/Login/Login.tsx";

function App() {

    return (
    <div className="app">
      <Routes>

        <Route path="/" element={<Layout />}>

            {/* default */}
            <Route path="login" element={<Login />}/>

        </Route>

      </Routes>
    </div>
  )
}

export default App
