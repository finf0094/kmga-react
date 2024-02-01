import * as React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className='dashboard'>
      <div className="dashboard__title">
        <Link to="/login">login</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
