import { Route, Routes } from "react-router-dom"
import { Layout } from "@components";
import { LoginPage, DashboardPage } from "@pages";
import { RequireAuth } from "@components";
import { Roles } from "@interfaces";
import AuthSuccess from "@components/AuthSuccess/AuthSuccess.tsx";
import AddQuestionPage from "./pages/add-question/AddQuestionPage";
import QuizStatisticsPage from "./pages/quiz-statistics/QuizStatisticsPage";
import EditQuestionPage from "./pages/edit-question/EditQuestionPage";
import PlayerScreenPage from "./pages/player-screen/PlayerScreenPage";

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
						<Route path="quiz/:quizId/question" element={<AddQuestionPage />} />
						<Route path="quiz/:quizId/question/:questionId" element={<EditQuestionPage />} />
						<Route path="quiz/:quizId/statistics" element={<QuizStatisticsPage users={[
							{
								id: 1,
								email: "finf0094@gmail.com"
							},
							{
								id: 2,
								email: "mikosh.armanov@gmail.com"
							},
						]} />} />
						<Route path="quiz/:quizId/pass" element={<PlayerScreenPage />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
