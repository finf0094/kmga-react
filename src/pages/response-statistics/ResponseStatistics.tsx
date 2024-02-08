import { useNavigate, useParams } from 'react-router-dom';
import { useGetResponseQuery } from '@store/api'; 
import { Loader } from '@src/components'; 
import { UITitle } from '@src/components/Base UI';
import './ResponseStatistics.css'

const ResponseStatisticsPage = () => {
  const { responseId } = useParams() as { responseId: string };
  const { data: response, isLoading, isError } = useGetResponseQuery(responseId);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError || !response) return <div>Ошибка загрузки деталей ответа</div>;

  return (
    <div className="response-statistics page">
      <div className="back" onClick={() => navigate(-1)}>Назад</div>
      <UITitle title={`Тест ${response.Quiz.title}`} subtitle={`Пользователь ${response.User.email}`} />
      <div className='response-statistics__answers'>
        {response.ResponseQuestion.map((rq, index) => (
          <div key={index} className='response-statistics__answer'>
            <h3>{rq.Question.title}</h3>
            <div>Ответ: <span>{rq.Option.value}</span></div>
          </div>
        ))}
      </div>
      <p className='response-statistics__date'><span>Дата ответа:</span> {new Date(response.createdAt).toLocaleDateString()}</p>
      <p className='response-statistics__date'><span>Последнее обновление:</span> {new Date(response.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ResponseStatisticsPage;