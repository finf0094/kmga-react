import {FC, useState} from "react";
import {useCreateQuizMutation, useGetAllQuizQuery} from "@store/api/quiz-api.ts";
import QuizCard from "@components/Quiz/quiz-card/quiz-card.tsx";
import {CreateQuizModal} from "@components/Quiz";

const DashboardPage: FC = () => {
    const {data, isLoading, isError, error} = useGetAllQuizQuery({page: 1, perPage: 10})
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
            <div className="dashboard__title">
                <button onClick={openModal}>createQuiz</button>
                awdas
                {data?.data.map(item => (
                    <QuizCard key={item.id} title={item.title} description={item.description} tags={item.tags}
                              status={item.status} createdAt={item.createdAt}/>
                ))}
            </div>
            <CreateQuizModal isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
        </div>
    );
};

export default DashboardPage;
