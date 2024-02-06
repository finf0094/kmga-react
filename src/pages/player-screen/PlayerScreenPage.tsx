import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllQuestionQuery, useGetQuestionByIdQuery, useCreateResponseMutation } from '@store/api';
import { Loader } from '@src/components';
import useAuth from '@src/hooks/useAuth';
import { baseUrl } from '@src/services/api';

interface SelectedOption {
    [questionId: string]: string;
}


interface CreateResponsePayload {
    userId: string;
    quizId: string;
    questions: Array<{
        questionId: string;
        optionId: string;
    }>;
}

export default function PlayerScreenPage() {
    const { quizId } = useParams() as {quizId: string};
    const {user} = useAuth();
    const { data: questions, isLoading: isLoadingQuestions } = useGetAllQuestionQuery(quizId);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({});
    const [createResponse, { isLoading: isSubmitting, isSuccess }] = useCreateResponseMutation();
    const [email, setEmail] = useState<string>('');
    const [accessGranted, setAccessGranted] = useState<boolean>(false);

    const checkAccess = async () => {
        const response = await fetch(`${baseUrl}/quizzes/check-access?quizId=${quizId}&email=${email}`);
        if (response.ok) {
            setAccessGranted(true);
        } else {
            alert('Доступ запрещен');
        }
    };

    const currentQuestionId = questions?.[currentQuestionIndex]?.id;
    const { data: currentQuestion, isLoading: isLoadingCurrentQuestion, error } = useGetQuestionByIdQuery(currentQuestionId || '', {
        skip: !currentQuestionId,
    });

    const handleOptionChange = (optionId: string) => {
        setSelectedOptions(prev => ({ ...prev, [currentQuestionId]: optionId }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handleSubmit = async () => {
        const responsePayload: CreateResponsePayload = {
            userId: user.id, // Замените на актуальный ID пользователя
            quizId,
            questions: Object.entries(selectedOptions).map(([questionId, optionId]) => ({
                questionId,
                optionId,
            })),
        };

        try {
            await createResponse(responsePayload).unwrap();
            alert('Ответы успешно отправлены!');
        } catch (error) {
            console.error('Ошибка при отправке ответов:', error);
            alert('Ошибка при отправке ответов');
        }
    };

    if (isLoadingQuestions || isLoadingCurrentQuestion || !currentQuestion) return <Loader />;
    if (error) return <div>Произошла ошибка при загрузке вопроса</div>;

    if (!accessGranted) {
        return (
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                />
                <button onClick={checkAccess}>Проверить доступ</button>
            </div>
        );
    }

    return (
        <div className="player-screen">
            <h1>Вопросы</h1>
            <div key={currentQuestion.id}>
                <h3>{currentQuestion.title}</h3>
                <ul>
                    {currentQuestion.options.map(option => (
                        <li key={option.id}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    value={option.id}
                                    checked={selectedOptions[currentQuestion.id] === option.id}
                                    onChange={() => handleOptionChange(option.id)}
                                />
                                {option.value}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {currentQuestionIndex < (questions?.length - 1) ? (
                <button onClick={handleNextQuestion}>Следующий вопрос</button>
            ) : (
                <button onClick={handleSubmit} disabled={isSubmitting}>Отправить ответы</button>
            )}
            {isSuccess && <div>Спасибо за прохождение квиза!</div>}
        </div>
    );
}