import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "@components";
import { LoginPage, DashboardPage } from "@pages";
import { RequireAuth } from "@components";
import { Roles } from "@interfaces";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import AuthSuccess from "@components/AuthSuccess/AuthSuccess.tsx";
import AddQuestionPage from "./pages/add-question/AddQuestionPage";

function App() {
	const navigate = useNavigate();

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
					<Route path="auth/success" element={<AuthSuccess />} />
					{/* for admin or authorized user */}
					<Route element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}>
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="add-question" element={<AddQuestionPage />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
