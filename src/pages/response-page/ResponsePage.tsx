import { useParams } from 'react-router-dom';
import { useGetResponseQuery } from '@store/api'; // Импортируйте ваш хук запроса
import { Loader } from '@src/components';
import './ResponsePage.css'
import { UITitle } from '@src/components/Base UI';

const ResponsePage = () => {
  const { responseId } = useParams() as {responseId: string}; // Получаем responseId из URL
  const { data: response, isLoading, isError } = useGetResponseQuery(responseId);

  if (isLoading) return <Loader />;
  if (isError || !response) return <div className='loading'>Ошибка при загрузе деталей запроса</div>;

  return (
    <div>
      <UITitle title='Детали' subtitle='Детали запроса для теста' />
      <h2 className='response__name'>{response.Quiz.title}</h2>
      <p className='response__user'>Пользователь: {response.User.email}</p>
      <div className='response__item'>
        {response.ResponseQuestion.map((rq, index) => (
          <div key={index}>
            <h3>{rq.Question.title}</h3>
            <p>Ответ: {rq.Option.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsePage;