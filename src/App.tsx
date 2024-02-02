import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "@components";
import { LoginPage, DashboardPage } from "@pages";
import { RequireAuth } from "@components";
import { Roles } from "@interfaces";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import Cookies from "js-cookie";
import { refreshTokens } from "./store/slices";

function App() {

	const navigate = useNavigate();
	const dispatch = useAppDispatch()

	useEffect(() => {
		// Предполагаем, что токен доступен в куках
		const refreshtoken = Cookies.get('refreshtoken');
		console.log(refreshtoken)

		if (refreshtoken) {
			dispatch(refreshTokens())
			navigate('/dashboard');
		} else {
			// Если токен не найден, перенаправляем на страницу входа
			navigate('/login');
		}
	}, [dispatch, navigate]);

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
