import {useNavigate, useParams} from "react-router-dom";
import {
    useCreateSessionMutation,
    useDeleteSessionMutation,
    useGetAllSessionQuery
} from "@store/api";
import {UIField, UITitle} from "@components/Base UI";
import {useState} from "react";
import toast from "react-hot-toast";
import {Loader, Pagination} from "@components";
import './AllowedEmail.css'
import {SessionStatus} from "@interfaces";

const AllowedEmailPage = () => {
    const {quizId} = useParams() as { quizId: string };
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<SessionStatus | null>(null);

    const [createSession, {isLoading}] = useCreateSessionMutation();
    const [deleteSession, {isLoading: isDeleting}] = useDeleteSessionMutation();
    const {data: sessions, isLoading: isSessionsLoading, refetch} = useGetAllSessionQuery({page: currentPage, status: selectedStatus});

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);

    const handleSubmit = async () => {
        if (email) {
            try {
                await createSession({quizId, email});
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

    if (isLoading || isSessionsLoading || isDeleting) return <Loader/>;

    return (
        <div className="allowed-email page">
            <div className="back" onClick={() => navigate(-1)}>Назад</div>
            <UITitle title="Доступ" subtitle="Дать доступ пользователю к тесту"/>
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
                <div className="select-container">
                    <select className="select-custom" onChange={handleStatusChange}>
                        <option value="Все">Все</option>
                        <option value={SessionStatus.COMPLETED}>Completed</option>
                        <option value={SessionStatus.NOT_STARTED}>Not started</option>
                        <option value={SessionStatus.IN_PROGRESS}>In progress</option>
                    </select>
                </div>
            </div>
            <div className="allowed-email__table">
                <table>
                    <thead>
                    <tr>
                        <td className='user'><span>Пользователь</span> <span>статус</span> <span>Удалить</span></td>
                    </tr>
                    </thead>
                    <tbody>
                    {sessions &&
                        sessions.data?.map((session) => (
                            <tr>
                                <td key={session.id} className='user'>
                                    {session?.email?.email}
                                    <span>{session.status}</span>
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
