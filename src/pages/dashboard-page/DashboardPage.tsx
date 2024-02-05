import { FC, useState } from "react";
import { useCreateQuizMutation, useGetAllQuizQuery } from "@store/api/quiz-api.ts";
import QuizCard from "@components/Quiz/quiz-card/quiz-card.tsx";
import { CreateQuizModal } from "@components/Quiz";
import './DashboardPage.css'
import UITitle from "@src/components/Base UI/UITitle";

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
        return <div className="loading">Загрузка...</div>
    }

    if (isError) {
        console.error(error)
        return <div className="loading">Произошла ошибка: {JSON.stringify(error)}</div>
    }

    const onSubmit = async (quizData: { title: string; description: string; tags: string[] }) => {
        try {
            await create(quizData).unwrap();
            closeModal();
            window.location.reload();
        } catch (err) {
            console.error('Failed to create quiz:', err);
            return <div className="loading">Произошла ошибка: {JSON.stringify(err)}</div>
        }
    };

    return (
        <div className='dashboard page'>
            <UITitle title='Все опросы' subtitle='Все опросы нашей организации' />
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
                    <QuizCard key={item.id} title={item.title} description={item.description} tags={item.tags} status={item.status} createdAt={item.createdAt} />
                ))}
            </section>
            <CreateQuizModal isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
        </div>
    );
};

export default DashboardPage;
