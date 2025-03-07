import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@src/components';
import { UITitle } from '@src/components/Base UI';
import './ResponseStatistics.css';
import { useSessionStatisticsQuery } from '@store/api';
import dayjs from 'dayjs';

const ResponseStatisticsPage = () => {
    const { sessionId } = useParams() as { sessionId: string };
    const { data, isLoading, isError } = useSessionStatisticsQuery(sessionId);
    const navigate = useNavigate();

    if (isLoading) return <Loader />;
    if (isError || !data) return <div className="loading">Error loading response details</div>;

    return (
        <div className="response-statistics page">
            <div className="back" onClick={() => navigate(-1)}>Back</div>
            <UITitle title={data.quizTitle} subtitle={data.email} />
            <div className="response-statistics__answers">
                {data.questions.map((question, index) => (
                    <div key={index} className="response-statistics__answer">
                        <h3>{question.title}</h3>
                        <div>
                            Answer:
                            <span>
                {question.options
                    .filter(option => option.isSelected)
                    .map((option, optionIndex) => <span key={optionIndex}>{option.value}</span>)
                }
              </span>
                        </div>
                    </div>
                ))}
            </div>
            <p className="response-statistics__date"><span>Average:</span> {data.averageWeight.toFixed(2)}%</p>
            <p className="response-statistics__date"><span>feedback:</span> {data.feedBack} </p>
            <p className="response-statistics__date">
                <span>Date of create:</span> {dayjs(data.createdAt).format('DD.MM.YYYY HH:mm')}
            </p>
            <p className="response-statistics__date">
                <span>Date of send:</span> {dayjs(data.sendedTime).format('DD.MM.YYYY HH:mm')}
            </p>
            <p className="response-statistics__date">
                <span>Date of response:</span> {dayjs(data.endTime).format('DD.MM.YYYY HH:mm')}
            </p>
        </div>
    );
};

export default ResponseStatisticsPage;