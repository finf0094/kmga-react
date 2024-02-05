// components/UIInputField.tsx
import React, { FC } from 'react';
import './styles.css';

interface UIInputFieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const UIInputField: FC<UIInputFieldProps> = ({ id, label, error, className = '', inputProps }) => {
  return (
    <div className={`ui-input-field ${className}`}>
      <label htmlFor={id} className="ui-input-field__label">{label}</label>
      <input id={id} {...inputProps} className={`ui-input-field__input ${error ? 'ui-input-field__input--error' : ''}`} />
      {error && <span className="ui-input-field__error">{error}</span>}
    </div>
  );
};

export default UIInputField;