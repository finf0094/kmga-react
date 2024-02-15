import * as React from 'react';
import './styles.css'

interface UITitleProps {
  title: string;
  subtitle: string | null;
}

const UITitle: React.FC<UITitleProps> = ({ title, subtitle }) => {
  return (
    <div className="ui-title__head">
      <h2 className="ui-title__title">{title}</h2>
      <p className="ui-title__desc">{subtitle}</p>
    </div>
  );
};

export default UITitle;
