import * as React from 'react';
import './styles.css'

interface UIFormProps {
  submitFn: () => void;
  isButton: boolean;
  buttonText?: string;
  buttonDisabled?: boolean;
  children: React.ReactNode;
}


const UIForm: React.FC<UIFormProps> = ({ submitFn, isButton, buttonText, buttonDisabled, children }) => {
  return (
    <form onSubmit={submitFn} className='ui-form'>
      {children}

      {isButton && <button className='ui-form__button' disabled={buttonDisabled}>{buttonText}</button>}
    </form>
  );
};

export default UIForm;
