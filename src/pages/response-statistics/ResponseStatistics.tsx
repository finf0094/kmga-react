import { useParams } from 'react-router-dom';
import { useGetResponseQuery } from '@store/api'; 
import { Loader } from '@src/components'; 

const ResponseStatisticsPage = () => {
  const { responseId } = useParams() as { responseId: string };
  const { data: response, isLoading, isError } = useGetResponseQuery(responseId);

  if (isLoading) return <Loader />;
  if (isError || !response) return <div>Ошибка загрузки деталей ответа</div>;

  return (
    <div className="response-statistics page">
      <h1>Детали ответа на квиз: {response.Quiz.title}</h1>
      <h2>Пользователь: {response.User.email}</h2>
      <div>
        {response.ResponseQuestion.map((rq, index) => (
          <div key={index}>
            <h3>Вопрос: {rq.Question.title}</h3>
            <p>Выбранный вариант ответа: {rq.Option.value}</p>
          </div>
        ))}
      </div>
      <p>Дата ответа: {new Date(response.createdAt).toLocaleDateString()}</p>
      <p>Последнее обновление: {new Date(response.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ResponseStatisticsPage;