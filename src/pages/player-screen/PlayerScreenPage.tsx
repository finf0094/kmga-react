import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    useGetAllQuestionsQuery,
    useGetQuestionByIdQuery,
    useGetSessionQuery,
    useEndQuizMutation, useStartQuizMutation, useSubmitAnswerMutation,
} from "@store/api";
import {Loader} from "@src/components";
import "./PlayerScreenPage.css";
import {UITitle} from "@components/Base UI";
import toast from "react-hot-toast";

interface SelectedOption {
    [questionId: string]: string;
}

export default function PlayerScreenPage() {
    const {sessionId} = useParams<string>() as { sessionId: string };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({});
    const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
    const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
    const [endQuizFn, {isLoading: isSubmitting}] = useEndQuizMutation();
    const [startQuizFn] = useStartQuizMutation();
    const [submitAnswer] = useSubmitAnswerMutation();

    const {data: session, isLoading: isLoadingSession} = useGetSessionQuery(sessionId);
    const {data: questions, isLoading: isLoadingQuestions} = useGetAllQuestionsQuery(session?.quizId);
    
    useEffect(() => {
        console.log(session);
        
        if (session?.status === 'COMPLETED') {
            setIsQuizStarted(true);
            setIsQuizFinished(true);
        }
    }, [setIsQuizFinished, session]);

    const currentQuestionId = questions?.[currentQuestionIndex]?.id as string;
    const currentQuizId = session?.quizId as string;

    const {data: currentQuestion, isLoading: isLoadingCurrentQuestion} = useGetQuestionByIdQuery({
        quizId: currentQuizId,
        questionId: currentQuestionId
    }, {
        skip: !currentQuestionId, // Пропускаем запрос, если ID текущего вопроса не определен
    });

    if (isLoadingSession || isLoadingQuestions || !session || isLoadingCurrentQuestion || isSubmitting) return <Loader/>;

    const handleOptionChange = (optionId: string) => {
        const questionId = currentQuestionId || "defaultQuestionId";
        setSelectedOptions((prev) => ({...prev, [questionId]: optionId}));
    };

    const handleNextQuestion = async () => {
        const selectedOption = selectedOptions[currentQuestionId];
        if (selectedOption) {
            try {
                await submitAnswer({ sessionId, questionId: currentQuestionId, answerId: selectedOption });
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            } catch (error) {
                console.error("Ошибка при отправке ответа:", error);
                toast.error("Ошибка при отправке ответа");
            }
        } else {
            toast.error("Пожалуйста, выберите ответ перед переходом к следующему вопросу");
        }
    };

    const startQuiz = async () => {
        try {
            await startQuizFn(sessionId);
            setIsQuizStarted(true);
        } catch (error) {
            console.error("Ошибка при отправке ответов:", error);
            toast.error("Ошибка при отправке ответов");
        }
    };

    const endQuiz = async () => {
        try {
            await endQuizFn(sessionId);
            toast.success("Опрос успешно окончен!");
            setIsQuizFinished(true);
        } catch (error) {
            console.error("Ошибка при завершении теста:", error);
            toast.error("Ошибка при завершении теста");
        }
    };

    if (!isQuizStarted) {
        return (
            <div className="page">
                <div className="player-screen__quiz player-screen__start">
                    <UITitle title="Тест" subtitle="Начало теста"/>
                    <div className="player-screen__start-content">
                        <h1 className="player-screen__title">Для начала опроса нажмите на кнопку ниже</h1>
                        <button onClick={startQuiz} className="player-screen__button">Начать опрос</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="player-screen">
            {!isQuizFinished ? (
                <div className="player-screen__quiz">
                    <UITitle title={session.quiz.title} subtitle="Пройдите опрос"/>
                    <div key={currentQuestion?.id}>
                        <h3 className="player-screen__name">{currentQuestion?.title}</h3>
                        <ul className="player-screen__answers">
                            {currentQuestion?.options.map((option) => (
                                <li
                                    key={option.id}
                                    onClick={() => handleOptionChange(option.id)}
                                    className={
                                        selectedOptions[currentQuestion.id] === option.id
                                            ? "player-screen__answer selected"
                                            : "player-screen__answer"
                                    }
                                >
                                    {option.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {currentQuestionIndex < (questions?.length ?? 0) - 1 ? (
                        <button onClick={handleNextQuestion} className="player-screen__button quiz-button">
                            Следующий вопрос
                        </button>
                    ) : (
                        <button onClick={endQuiz} disabled={isSubmitting} className="player-screen__button quiz-button">
                            Отправить ответы
                        </button>
                    )}
                </div>
            ) : (
                <div className="player-screen__finish">
                    <h1>Опрос был пройден! Можете закрыть эту страницу.</h1>
                </div>
            )}
        </div>

    );
}
