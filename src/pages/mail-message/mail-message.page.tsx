import { useNavigate, useSearchParams } from 'react-router-dom';
import { MailMessageForm } from './components/mail-message.form.tsx';


export const MailMessagePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const quizId = searchParams.get('quizId');
    const mailMessageId = searchParams.get('mailMessageId') as string | undefined;

    if (!quizId) {
        return <>Quiz id is not provided</>;
    }

    return (
        <div style={{ marginTop: 48, padding: 48 }}>
            <div className="back" onClick={() => navigate(-1)}>
                Back
            </div>
            <MailMessageForm
                quizId={quizId}
                mailMessageId={mailMessageId}
            />
        </div>
    );
};