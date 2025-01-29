export interface MailMessage {
    id: string;
    title: string;
    content: string;
    footer?: string;
    quizId: string;
}