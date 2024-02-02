import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "@components";
import { LoginPage, DashboardPage } from "@pages";
import { RequireAuth } from "@components/RequiredAuth";
import { Roles } from "@interfaces";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function App() {

	const navigate = useNavigate();

	// console.log(`
  //   ################################################
  //     🛡️  Server starts on mode: ${import.meta.env.VITE_NODE_ENV} 🛡️
  //     ################################################
  //   `)

	const { isAuthenticated } = useAuth();
	useEffect(() => {

		if (!isAuthenticated && location.pathname === '/') {
			navigate('/login');
		} else if (isAuthenticated && location.pathname === '/login') {
			navigate('/dashboard');
		}
	}, [isAuthenticated, navigate])


	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* default */}
					<Route path="login" element={<LoginPage />} />
					{/* for admin or authorized user */}
					<Route element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}>
						<Route path="dashboard" element={<DashboardPage />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
