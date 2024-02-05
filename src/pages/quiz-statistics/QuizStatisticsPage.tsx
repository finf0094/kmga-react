import * as React from 'react';
import './QuizStatisticsPage.css'
import UITitle from '@src/components/Base UI/UITitle';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  email: string;
}

const QuizStatisticsPage: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="quiz-statistics page">
      <UITitle title='Статистика' subtitle='Статистика данного опроса' />

      <div className="statistics__content">
        <table>
          <thead>
            <tr>
              <td><input type="checkbox" /></td>
              <td className='user'><span>Пользователь</span> <span>Посмотреть ответы</span></td>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td className='user'>{user.email}<Link to=''>Посмотреть</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizStatisticsPage;
