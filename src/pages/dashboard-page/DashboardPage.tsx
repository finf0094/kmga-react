import { FC, useState } from "react";
import { useCreateQuizMutation, useGetAllQuizQuery } from "@store/api/quiz-api.ts";
import QuizCard from "@components/Quiz/quiz-card/quiz-card.tsx";
import { CreateQuizModal } from "@components/Quiz";
import './DashboardPage.css'
import UITitle from "@src/components/Base UI/UITitle";
import toast from "react-hot-toast";
import { ErrorResponse, QuizStatus } from "@src/interfaces";

const DashboardPage: FC = () => {
    //LOCAL STATE
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<QuizStatus | null>(null);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    // API
    const { data, isLoading, isError, error } = useGetAllQuizQuery({ page: 1, perPage: 10, status: selectedStatus });
    const [create] = useCreateQuizMutation()

    // HANDLERS
    const onSubmit = async (quizData: { title: string; description: string; tags: string[] }) => {
        try {
            await create(quizData).unwrap();
            closeModal();
            window.location.reload();
        } catch (err: unknown) {
            const error = err as ErrorResponse

            if (error?.status === 403) {
                toast.error("Не хватает прав")
            }

            console.error('Failed to create quiz:', err);
        }
    };
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        if (value === 'Все') {
            setSelectedStatus(null);
        } else {
            setSelectedStatus(value as QuizStatus);
        }
    };

    if (isLoading) return <div className="loading">Загрузка...</div>
    if (isError) {
        console.error(error)
        return <div className="loading">Произошла ошибка: {JSON.stringify(error)}</div>
    }

    return (
        <div className='dashboard page'>
            <UITitle title='Все опросы' subtitle='Все опросы нашей организации' />
            <div className="dashboard__action">
                <button type="submit" className="dashboard__button" onClick={openModal}>Новый опрос</button>
                <div className="select-container">
                    <select className="select-custom" onChange={handleStatusChange}>
                        <option value="Все">Все</option>
                        <option value={QuizStatus.ACTIVE}>Активные</option>
                        <option value={QuizStatus.INACTIVE}>Неактивные</option>
                        <option value={QuizStatus.DRAFT}>Черновик</option>
                    </select>
                </div>
            </div>
            <section className="dashboard__content">
                {data?.data.map(item => (
                    <QuizCard key={item.id} id={item.id} title={item.title} description={item.description} tags={item.tags} status={item.status} createdAt={item.createdAt} />
                ))}
            </section>
            <CreateQuizModal isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
        </div>
    );
};

export default DashboardPage;
