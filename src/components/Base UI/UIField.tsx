import * as React from "react";
import "./styles.css";

interface UIFieldProps {
  id: string;
  label: string;
  error?: string | undefined;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const UIField: React.FC<UIFieldProps> = ({ id, label, error, inputProps }) => {
  return (
    <div className="ui-field">
      <label htmlFor={id} className="ui-field__label">
        {label}
      </label>
      <input className="ui-field__input" id={id} {...inputProps} />
      {error && <span className="ui-field__error">{error}</span>}
    </div>
  );
};

export default UIField;
