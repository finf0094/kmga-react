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

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleSubmit = async () => {
		if (email) {
			if (!validateEmail(email)) {
				toast.error("Please, enter a valid email.");
				return;
			}
			try {
				if (sessions?.data.find((session) => session.email?.email === email)) {
					toast.error("This email is already exists.");
          return;
				}

				await createSession({ quizId, email });
				toast.success("Session was created successfully.");
				setEmail("");
				refetch(); // Обновить список после добавления
			} catch (error) {
				console.error("Error creating session:", error);
				toast.error("Error creating session.");
			}
		} else {
			toast.error("Please, enter a email.");
		}
	};

	const handleDelete = async (sessionId: string) => {
		try {
			await deleteSession(sessionId);
			toast.success("Session was deleted successfully.");
			refetch()
		} catch (error) {
			console.error("Error deleting session:", error);
			toast.error("Error deleting session.");
		}
	};
	const onPageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		if (value === 'All') {
			setSelectedStatus(null);
		} else {
			setSelectedStatus(value as SessionStatus);
		}
	};

	if (isLoading || isSessionsLoading || isDeleting) return <Loader />;

	return (
		<div className="allowed-email page">
			<div className="back" onClick={() => navigate(-1)}>Back</div>
			<UITitle title="Session" subtitle="Create a session for a user" />
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
				<button onClick={handleSubmit} className="allowed-email__button">Create</button>
				<div className="allowed-email__select">
					<select className="select-custom" onChange={handleStatusChange}>
						<option value="Все">All</option>
						<option value={SessionStatus.COMPLETED}>Completed</option>
						<option value={SessionStatus.NOT_STARTED}>Not Started</option>
						<option value={SessionStatus.IN_PROGRESS}>In Progress</option>
					</select>
				</div>
			</div>
			{sessions && sessions.data.length > 0 ? (
				<div className="allowed-email__table">
					<table>
						<thead>
							<tr>
								<td className='user'><span>Email</span> <span>Status</span> <span>Delete</span></td>
							</tr>
						</thead>
						<tbody>
							{sessions.data?.map((session) => (
								<tr key={session.id}>
									<td className='user'>
										{session.status === 'COMPLETED' ? <Link to={`/session/${session.id}/statistics?email=${session?.email?.email}`} >{session?.email?.email}</Link> : <span>{session?.email?.email}</span>}
										{session.status === 'COMPLETED' && 'Completed' || session.status === 'NOT_STARTED' && 'Not Started' || session.status === 'IN_PROGRESS' && 'In Progress'}
										<button className="allowed-email__delete" onClick={() => handleDelete(session.id)}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<h3 className="allowed-email__empty">No sessions</h3>
			)}
			{sessions && <Pagination meta={sessions.meta} visiblePages={10} onPageChange={onPageChange} />}
		</div>
	);
};

export default AllowedEmailPage;
