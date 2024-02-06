import './QuizStatisticsPage.css';
import UITitle from '@src/components/Base UI/UITitle';
import { Link, useParams } from 'react-router-dom';
import { useGetStatisticsQuery } from '@store/api'; // Предполагается, что вы экспортировали хук из сервиса API


const QuizStatisticsPage = () => {
  const { quizId } = useParams() as {quizId: string}; // Получаем quizId из URL
  const { data: statistics, isLoading, isError } = useGetStatisticsQuery(quizId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !statistics) return <div>Error loading statistics</div>;

  return (
    <div className="quiz-statistics page">
      <UITitle title='Статистика' subtitle='Статистика данного опроса' />

      <div className="statistics__content">
        <table>
          <thead>
            <tr>
              <td><input type="checkbox" /></td>
              <td className='user'><span>Пользователь</span> <span>Посмотреть</span></td>
            </tr>
          </thead>
          <tbody>
            {statistics.users.map((user) => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td className='user'>{user.email}<Link to={`/response/${user.responseId}/statistics`}>Посмотреть</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizStatisticsPage;