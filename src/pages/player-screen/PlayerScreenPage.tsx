import {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetAllQuestionQuery, useCreateResponseMutation, useGetQuestionByIdQuery} from "@store/api";
import {Loader} from "@src/components";
import useAuth from "@src/hooks/useAuth";
import {baseUrl} from "@src/services/api";
import './PlayerScreenPage.css';
import {UITitle} from "@components/Base UI";

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
    const {quizId} = useParams<{ quizId: string }>() as { quizId: string };
    const {user} = useAuth();
    const {data: questions, isLoading: isLoadingQuestions} = useGetAllQuestionQuery(quizId);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({});
    const [createResponse, {isLoading: isSubmitting}] = useCreateResponseMutation();
    const [email, setEmail] = useState<string>(user.email);
    const [accessGranted, setAccessGranted] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const currentQuestionId = questions?.[currentQuestionIndex]?.id as string;

    // Используем хук для получения деталей текущего вопроса
    const { data: currentQuestion, isLoading: isLoadingCurrentQuestion } = useGetQuestionByIdQuery(currentQuestionId, {
        skip: !currentQuestionId, // Пропускаем запрос, если ID текущего вопроса не определен
    });

    const sendEmailForCode = async () => {
        setIsVerifying(true);
        // Здесь должен быть запрос на ваш API для отправки кода на email
        // Пример:
        const response = await fetch(`${baseUrl}/quiz/${quizId}/send-verification-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });
        setIsVerifying(false);
        if (response.ok) {
            setIsEmailSent(true);
        } else {
            alert("Ошибка при отправке кода");
        }
    };

    const checkAccess = async () => {
        setIsVerifying(true);
        const response = await fetch(
            `${baseUrl}/quiz/${quizId}/verify-code?email=${email}&code=${verificationCode}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        setIsVerifying(false);
        if (response.ok) {
            setAccessGranted(true);
        } else {
            alert("Неверный код или доступ запрещен");
        }
    };

    if (isLoadingQuestions || !questions || isLoadingCurrentQuestion) {
        return <Loader/>;
    }

    if (!accessGranted) {
        return (
            <div className="page">
                <UITitle title="Доступ" subtitle="Введите ваш email и код для доступа к тесту"/>
                <div className="player-screen__check">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите ваш email"
                        disabled={isEmailSent}
                    />
                    {isEmailSent ? (
                        <>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="Введите код верификации"
                            />
                            <button onClick={checkAccess} disabled={isVerifying}
                                    className="player-screen__button">Проверить код
                            </button>
                        </>
                    ) : (
                        <button onClick={sendEmailForCode} disabled={isVerifying}
                                className="player-screen__button">Получить код
                        </button>
                    )}
                </div>
            </div>
        );
    }
    const handleOptionChange = (optionId: string) => {
        const questionId = currentQuestionId || "defaultQuestionId";
        setSelectedOptions((prev) => ({...prev, [questionId]: optionId}));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handleSubmit = async () => {
        const responsePayload: CreateResponsePayload = {
            userId: user.id,
            quizId,
            questions: Object.entries(selectedOptions).map(([questionId, optionId]) => ({
                questionId,
                optionId,
            })),
        };

        try {
            await createResponse(responsePayload).unwrap();
            alert("Ответы успешно отправлены!");
        } catch (error) {
            console.error("Ошибка при отправке ответов:", error);
            alert("Ошибка при отправке ответов");
        }
    };

    return (
        <div className="player-screen">
            <div className="player-screen__quiz">
                <UITitle title="Тест" subtitle="Пройдите тест"/>
                <div key={currentQuestion?.id}>
                    <h3 className="player-screen__name">{currentQuestion?.title}</h3>
                    <ul className="player-screen__answers">
                        {currentQuestion?.options.map((option) => (
                            <li key={option.id} onClick={() => handleOptionChange(option.id)}
                                className={selectedOptions[currentQuestion.id] === option.id ? 'player-screen__answer selected' : 'player-screen__answer'}>
                                {option.value}
                            </li>
                        ))}
                    </ul>
                </div>
                {currentQuestionIndex < (questions?.length ?? 0) - 1 ? (
                    <button onClick={handleNextQuestion} className="player-screen__button quiz-button">Следующий
                        вопрос</button>
                ) : (
                    <button onClick={handleSubmit} disabled={isSubmitting}
                            className="player-screen__button quiz-button">
                        Отправить ответы
                    </button>
                )}
            </div>
        </div>
    );
}