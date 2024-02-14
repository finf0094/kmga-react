import { Link, useNavigate, useParams } from "react-router-dom";
import {
	useCreateSessionMutation,
	useDeleteSessionMutation,
	useGetAllSessionQuery
} from "@store/api";
import { UIField, UITitle } from "@components/Base UI";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader, Pagination } from "@components";
import './AllowedEmail.css'
import { SessionStatus } from "@interfaces";

const AllowedEmailPage = () => {
	const { quizId } = useParams() as { quizId: string };
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedStatus, setSelectedStatus] = useState<SessionStatus | null>(null);

	const [createSession, { isLoading }] = useCreateSessionMutation();
	const [deleteSession, { isLoading: isDeleting }] = useDeleteSessionMutation();
	const { data: sessions, isLoading: isSessionsLoading, refetch } = useGetAllSessionQuery({ page: currentPage, status: selectedStatus });

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handleSubmit = async () => {
		if (email) {
			try {
				await createSession({ quizId, email });
				toast.success("Сессия успешно была создана.");
				setEmail("");
				refetch(); // Обновить список после добавления
			} catch (error) {
				console.error("Ошибка при создании сессии:", error);
				toast.error("Ошибка при создании сессии.");
			}
		} else {
			toast.error("Пожалуйста, введите email.");
		}
	};
	const handleDelete = async (sessionId: string) => {
		try {
			await deleteSession(sessionId);
			toast.success("Сессия успешно удалено.");
			refetch()
		} catch (error) {
			console.error("Ошибка при удалений сессии:", error);
			toast.error("Ошибка при удалений сессии.");
		}
	};
	const onPageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		if (value === 'Все') {
			setSelectedStatus(null);
		} else {
			setSelectedStatus(value as SessionStatus);
		}
	};

	console.log(sessions?.data)

	if (isLoading || isSessionsLoading || isDeleting) return <Loader />;

	return (
		<div className="allowed-email page">
			<div className="back" onClick={() => navigate(-1)}>Назад</div>
			<UITitle title="Сессия" subtitle="Создать сессию для пользователя" />
			<div className="allowed-email__create">
				<UIField
					id={`email-${quizId}`}
					inputProps={{
						value: email,
						onChange: handleEmailChange,
						type: "email",
					}}
					label="Email"
				/>
				<button onClick={handleSubmit} className="allowed-email__button">Добавить</button>
				<div className="allowed-email__select">
					<select className="select-custom" onChange={handleStatusChange}>
						<option value="Все">Все</option>
						<option value={SessionStatus.COMPLETED}>Завершено</option>
						<option value={SessionStatus.NOT_STARTED}>Не начато</option>
						<option value={SessionStatus.IN_PROGRESS}>В прохождении</option>
					</select>
				</div>
			</div>
			<div className="allowed-email__table">
				<table>
					<thead>
						<tr>
							<td className='user'><span>Пользователь</span> <span>Статус</span> <span>Удалить</span></td>
						</tr>
					</thead>
					<tbody>
						{sessions && sessions.data?.map((session) => (
							<tr key={session.id}>
								<td className='user'>
									{session.status === 'COMPLETED' ? <Link to={`/session/${session.id}/statistics`} >{session?.email?.email}</Link> : <span>{session?.email?.email}</span>}
									{session.status === 'COMPLETED' && 'Завершено' || session.status === 'NOT_STARTED' && 'Не начато' || session.status === 'IN_PROGRESS' && 'В прохождении'}
									<button className="allowed-email__delete" onClick={() => handleDelete(session.id)}>Удалить</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{sessions && <Pagination meta={sessions.meta} visiblePages={10} onPageChange={onPageChange} />}
		</div>
	);
};

export default AllowedEmailPage;
