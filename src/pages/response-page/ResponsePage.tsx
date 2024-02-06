import { useParams } from 'react-router-dom';
import { useGetResponseQuery } from '@store/api'; // Импортируйте ваш хук запроса

const ResponsePage = () => {
  const { responseId } = useParams() as {responseId: string}; // Получаем responseId из URL
  const { data: response, isLoading, isError } = useGetResponseQuery(responseId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !response) return <div>Error loading response details</div>;

  return (
    <div>
      <h2>Response Details for Quiz: {response.Quiz.title}</h2>
      <p>User: {response.User.email}</p>
      <div>
        {response.ResponseQuestion.map((rq, index) => (
          <div key={index}>
            <h3>{rq.Question.title}</h3>
            <p>Selected Option: {rq.Option.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsePage;