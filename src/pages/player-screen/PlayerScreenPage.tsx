import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetAllQuestionsQuery,
    useGetQuestionByIdQuery,
    useGetSessionQuery,
    useEndQuizMutation, useStartQuizMutation, useSubmitAnswerMutation,
} from "@store/api";
import { Loader } from "@src/components";
import "./PlayerScreenPage.css";
import { UITitle } from "@components/Base UI";
import toast from "react-hot-toast";

interface SelectedOption {
    [questionId: string]: string;
}

export default function PlayerScreenPage() {
    const { sessionId } = useParams<string>() as { sessionId: string };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({});
    const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
    const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
    const [isFeedback, setIsFeedback] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string>("");

    const [endQuizFn, { isLoading: isSubmitting }] = useEndQuizMutation();
    const [startQuizFn] = useStartQuizMutation();
    const [submitAnswer] = useSubmitAnswerMutation();

    const { data: session, isLoading: isLoadingSession } = useGetSessionQuery(sessionId);
    const { data: questions, isLoading: isLoadingQuestions } = useGetAllQuestionsQuery(session?.quizId);

    useEffect(() => {
        console.log(session);

        if (session?.status === 'COMPLETED') {
            setIsQuizStarted(true);
            setIsQuizFinished(true);
        }
    }, [setIsQuizFinished, session]);

    const currentQuestionId = questions?.[currentQuestionIndex]?.id as string;
    const currentQuizId = session?.quizId as string;

    const { data: currentQuestion, isLoading: isLoadingCurrentQuestion } = useGetQuestionByIdQuery({
        quizId: currentQuizId,
        questionId: currentQuestionId
    }, {
        skip: !currentQuestionId, // Пропускаем запрос, если ID текущего вопроса не определен
    });

    if (isLoadingSession || isLoadingQuestions || !session || isLoadingCurrentQuestion || isSubmitting) return <Loader />;

    const handleOptionChange = (optionId: string) => {
        const questionId = currentQuestionId || "defaultQuestionId";
        setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const handleNextQuestion = async () => {
        const selectedOption = selectedOptions[currentQuestionId];
        if (selectedOption) {
            try {
                await submitAnswer({ sessionId, questionId: currentQuestionId, answerId: selectedOption });
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            } catch (error) {
                console.error("Error sending answer:", error);
                toast.error("Error sending answer.");
            }
        } else {
            toast.error("Please select an answer before moving on to the next question.");
        }
    };

    const handleFeedback = async () => {
        const selectedOption = selectedOptions[currentQuestionId];
        if (selectedOption) {
            try {
                await submitAnswer({ sessionId, questionId: currentQuestionId, answerId: selectedOption });
                setIsFeedback(true);
            } catch (error) {
                console.error("Error sending answer:", error);
                toast.error("Error sending answer.");
            }
        } else {
            toast.error("Please select an answer before moving on to the next question.");
        }


    }

    const startQuiz = async () => {
        try {
            await startQuizFn(sessionId);
            setIsQuizStarted(true);
        } catch (error) {
            console.error("Error :", error);
            toast.error("Error starting survey.");
        }
    };

    const endQuiz = async () => {
        try {
            const selectedOption = selectedOptions[currentQuestionId];
            await submitAnswer({ sessionId, questionId: currentQuestionId, answerId: selectedOption });
            await endQuizFn({ quizSessionId: sessionId, feedback });
            toast.success("Survey completed successfully!");
            setIsQuizFinished(true);
        } catch (error) {
            console.error("Error completing survey:", error);
            toast.error("Error completing survey.");
        }
    };

    if (!isQuizStarted) {
        return (
            <div className="page">
                <div className="player-screen__quiz player-screen__start">
                    <UITitle title="Start survey" subtitle="Start of the survey" />
                    <div className="player-screen__start-content">
                        <h1 className="player-screen__title">To start the survey, click the button below</h1>
                        <button onClick={startQuiz} className="player-screen__button">Start survey</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="player-screen">
            {!isQuizFinished ? (
                <div className="player-screen__quiz">
                    <UITitle title={session.quiz.title} subtitle="Take the survey" />
                    {!isFeedback ? (
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
                    ) : (
                        <div key={currentQuestion?.id}>
                            <h3 className="player-screen__name">Please leave feedback on this survey (not necessary) / Please, leave feedback (optional)/ Пожалуйста, оставьте отзыв (необязательно)</h3>
                            <textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} className="player-screen__feedback">

                            </textarea>
                        </div>
                    )}
                    {currentQuestionIndex < (questions?.length ?? 0) - 1 ? (
                        <button onClick={handleNextQuestion} className="player-screen__button quiz-button">
                            Next Question
                        </button>
                    ) : !isFeedback ? (
                        <button onClick={handleFeedback} disabled={isSubmitting} className="player-screen__button quiz-button">
                            Leave feedback
                        </button>
                    ) : <button onClick={endQuiz} className="player-screen__button">Finish survey</button>}

                </div>
            ) : (
                <div className="player-screen__finish">
                    <h1>The survey has been completed! You can close this page.</h1>
                </div>
            )}
        </div>

    );
}
