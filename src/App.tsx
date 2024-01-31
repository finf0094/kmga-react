import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          
        </Route>
      </Routes>
    </div>
  )
}

export default App
