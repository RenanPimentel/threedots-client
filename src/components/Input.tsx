import React, { useRef, useState } from "react";
import "../styles/Input.css";
import ChangeInputType from "./ChangeInputType";

interface Props {
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  label: string;
  id: string;
  type: InputType;
  error: string;
}

function Input({ id, label, onChange, value, type, error }: Props) {
  const [innerType, setInnerType] = useState<InputType>(type);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={
        "input-wrapper" + (error ? " error" : "") + (value ? " not-empty" : "")
      }
    >
      <label htmlFor={id} className="label">
        {error ? error : label}
      </label>
      <div className="input-container">
        <input
          id={id}
          onChange={onChange}
          value={value}
          type={innerType}
          ref={inputRef}
        />
        {type === "password" && (
          <ChangeInputType
            type={innerType}
            to={id}
            onClick={() => {
              setInnerType(innerType === "password" ? "text" : "password");
              inputRef.current?.focus();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Input;
