import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllQuestionsQuery,
  useGetQuestionByIdQuery,
  useGetSessionQuery,
  useEndQuizMutation,
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
  const [endQuizFn, { isLoading: isSubmitting }] = useEndQuizMutation();
  const [startQuizFn] = useEndQuizMutation();

  const { data: session, isLoading: isLoadingSession } = useGetSessionQuery(sessionId);
  const { data: questions, isLoading: isLoadingQuestions } = useGetAllQuestionsQuery(session?.quizId);

  const currentQuestionId = questions?.[currentQuestionIndex]?.id as string;

  // Используем хук для получения деталей текущего вопроса
  const { data: currentQuestion, isLoading: isLoadingCurrentQuestion } = useGetQuestionByIdQuery(currentQuestionId, {
    skip: !currentQuestionId, // Пропускаем запрос, если ID текущего вопроса не определен
  });

  if (isLoadingSession || isLoadingQuestions || !session || isLoadingCurrentQuestion || isSubmitting) return <Loader />;

  const handleOptionChange = (optionId: string) => {
    const questionId = currentQuestionId || "defaultQuestionId";
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
      toast.success("Тест успешно окончен!");
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
          <UITitle title="Тест" subtitle="Начало теста" />
          <div className="player-screen__start-content">
            <h1 className="player-screen__title">Для начала теста нажмите на кнопку ниже</h1>
            <button onClick={startQuiz} className="player-screen__button">Начать тест</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="player-screen">
      {!isQuizFinished ? (
        <div className="player-screen__quiz">
          <UITitle title={`Тест "${session.quiz.title}"`} subtitle="Пройдите тест" />
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
          <h1>Тест был пройден! Можете закрыть эту страницу.</h1>
        </div>
      )}
    </div>

  );
}
