import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@src/components';
import { UITitle } from '@src/components/Base UI';
import './ResponseStatistics.css'
import { useSessionStatisticsQuery } from "@store/api";

const ResponseStatisticsPage = () => {
  const { sessionId } = useParams() as { sessionId: string };
  const { data, isLoading, isError } = useSessionStatisticsQuery(sessionId);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email');

  if (isLoading) return <Loader />;
  if (isError || !data) return <div className='loading'>Error loading response details</div>;

  return (
    <div className="response-statistics page">
      <div className="back" onClick={() => navigate(-1)}>Back</div>
      <UITitle title={data.quizTitle} subtitle={email} />
      <div className='response-statistics__answers'>
        {data.questions.map((question, index) => (
          <div key={index} className='response-statistics__answer'>
            <h3>{question.title}</h3>
            <div>
              Ответ:
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
      <p className='response-statistics__date'><span>Date of response:</span> {new Date(data.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ResponseStatisticsPage;