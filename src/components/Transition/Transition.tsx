// TransitionComponent.js
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './TransitionComponent.css'; // Создайте файл стилей

const TransitionComponent: React.FC<{ in: boolean, children: React.ReactNode }> = ({ in: inProp, children }) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default TransitionComponent;
