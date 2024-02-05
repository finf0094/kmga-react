import { Route, Routes } from "react-router-dom"
import { Layout } from "@components";
import { LoginPage, DashboardPage } from "@pages";
import { RequireAuth } from "@components";
import { Roles } from "@interfaces";
import AuthSuccess from "@components/AuthSuccess/AuthSuccess.tsx";
import AddQuestionPage from "./pages/add-question/AddQuestionPage";
import QuizStatisticsPage from "./pages/quiz-statistics/QuizStatisticsPage";

function App() {
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
						<Route path="quiz-statistics" element={<QuizStatisticsPage users={[
							{
                id: 1,
                email: "finf0094@gmail.com"
              },
							{
                id: 2,
                email: "mikosh.armanov@gmail.com"
              },
						]} />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
