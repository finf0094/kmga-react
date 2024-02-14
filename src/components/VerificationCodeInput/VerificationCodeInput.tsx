import React, { useState, useRef, FC } from "react";
import './VerificationCodeInput.css'

interface VerificationCodeInputProps {
  length: number;
  onComplete: (code: string) => void;
}

const VerificationCodeInput: FC<VerificationCodeInputProps> = ({ length, onComplete }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  const processInput = (e: React.ChangeEvent<HTMLInputElement>, slot: number): void => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1 && inputs.current[slot + 1]) {
      inputs.current[slot + 1]?.focus();
    }
    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number): void => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0 && inputs.current[slot - 1]) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus();
    }
  };

  return (
    <div className="code-input">
      <div className="code-inputs">
        {code.map((num, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0] && idx === 0}
            onChange={e => processInput(e, idx)}
            onKeyUp={e => onKeyUp(e, idx)}
            ref={ref => (inputs.current[idx] = ref)}
          />
        ))}
      </div>
    </div>
  );
};

export default VerificationCodeInput;
