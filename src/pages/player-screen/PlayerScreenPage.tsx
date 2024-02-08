import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllQuestionQuery,
  useGetQuestionByIdQuery,
  useCreateResponseMutation,
} from "@store/api";
import { Loader } from "@src/components";
import useAuth from "@src/hooks/useAuth";
import { baseUrl } from "@src/services/api";
import { UITitle } from "@src/components/Base UI";
import './PlayerScreenPage.css'

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
  const { quizId } = useParams() as { quizId: string };
  const { user } = useAuth();
  const { data: questions, isLoading: isLoadingQuestions } = useGetAllQuestionQuery(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({});
  const [createResponse, { isLoading: isSubmitting }] = useCreateResponseMutation();
  const [email, setEmail] = useState<string>(user.email);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

  const checkAccess = async () => {
    const response = await fetch(
      `${baseUrl}/quiz/verify-access?quizId=${quizId}&email=${email}`,
    );
    if (response.ok) {
      setAccessGranted(true);
    } else {
      alert("Доступ запрещен");
    }
  };

  const currentQuestionId = questions?.[currentQuestionIndex]?.id;
  const {
    data: currentQuestion,
    isLoading: isLoadingCurrentQuestion,
    error,
  } = useGetQuestionByIdQuery(currentQuestionId || "", {
    skip: !currentQuestionId,
  });

  const handleOptionChange = (optionId: string) => {
    const questionId = currentQuestionId || "defaultQuestionId"; // Replace 'defaultQuestionId' with a suitable default
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    const responsePayload: CreateResponsePayload = {
      userId: user.id, // Замените на актуальный ID пользователя
      quizId,
      questions: Object.entries(selectedOptions).map(
        ([questionId, optionId]) => ({
          questionId,
          optionId,
        }),
      ),
    };

    try {
      await createResponse(responsePayload).unwrap();
      alert("Ответы успешно отправлены!");
    } catch (error) {
      console.error("Ошибка при отправке ответов:", error);
      alert("Ошибка при отправке ответов");
    }
  };

  if (isLoadingQuestions || isLoadingCurrentQuestion || !currentQuestion)
    return <Loader />;
  if (error) return <div>Произошла ошибка при загрузке вопроса</div>;

  if (!accessGranted) {
    return (
      <div className="page">
        <UITitle title="Доступ" subtitle="Проверить доступ к тесту" />
        <div className="player-screen__check">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
          />
          <button onClick={checkAccess} className="player-screen__button">Проверить доступ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-screen">
      <div className="player-screen__quiz">
        <UITitle title="Тест" subtitle="Пройдите тест" />
        <div key={currentQuestion.id}>
          <h3 className="player-screen__name">{currentQuestion.title}</h3>
          <ul className="player-screen__answers">
            {currentQuestion.options.map((option) => (
              <li key={option.id} onClick={() => handleOptionChange(option.id)} className={selectedOptions[currentQuestion.id] === option.id ? 'player-screen__answer selected' : 'player-screen__answer'}>
                {option.value}
              </li>
            ))}
          </ul>
        </div>
        {currentQuestionIndex < (questions?.length ?? 0) - 1 ? (
          <button onClick={handleNextQuestion} className="player-screen__button quiz-button">Следующий вопрос</button>
        ) : (
          <button onClick={handleSubmit} disabled={isSubmitting} className="player-screen__button quiz-button">
            Отправить ответы
          </button>
        )}
      </div>
    </div>
  );
}
