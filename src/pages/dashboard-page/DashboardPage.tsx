import { FC, useState } from "react";
import { useCreateQuizMutation, useGetAllQuizQuery } from "@store/api/quiz-api.ts";
import QuizCard from "@components/Quiz/quiz-card/quiz-card.tsx";
import { CreateQuizModal } from "@components/Quiz";
import './DashboardPage.css'

const DashboardPage: FC = () => {
    const { data, isLoading, isError, error } = useGetAllQuizQuery({ page: 1, perPage: 10 })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [create] = useCreateQuizMutation()
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div>loading</div>
    }

    if (isError) {
        console.error(error)
    }

    const onSubmit = async (quizData: { title: string; description: string; tags: string[] }) => {
        try {
            await create(quizData).unwrap();
            closeModal();
        } catch (err) {
            // Обработка ошибки создания викторины
            console.error('Failed to create quiz:', err);
        }
    };

    return (
        <div className='dashboard'>
            <div className="dashboard__head">
                <h2 className="dashboard__title">Все опросы</h2>
                <p className="dashboard__desc">Все опросы нашей организации</p>
            </div>
            <div className="dashboard__action">
                <button type="submit" className="dashboard__button" onClick={openModal}>Новый опрос</button>
                <div className="select-container">
                    <select className="select-custom">
                        <option>Все</option>
                        <option>Активные</option>
                        <option>Неактивные</option>
                        <option>Черновик</option>
                    </select>
                </div>
            </div>
            <section className="dashboard__content">
                {data?.data.map(item => (
                    <QuizCard key={item.id} title={item.title} description={item.description} tags={item.tags}
                        status={item.status} createdAt={item.createdAt} />
                ))}
            </section>
            <CreateQuizModal isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
        </div>
    );
};

export default DashboardPage;
