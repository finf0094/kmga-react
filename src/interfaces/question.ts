export interface IQuestion {
    id: string;
    title: string;
    quizId: string;
    options: {
        id: string;
        value: string;
        isCorrect: boolean;
        questionId: string;
    }[];
}