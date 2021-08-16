import React from "react";
import "../styles/Form.css";
import Input from "./Input";

interface Props {
  onSubmit(e: React.FormEvent<HTMLElement>): void;
  inputs: Input[];
  submitBtnName: string;
  handleChange(i: number, e: React.ChangeEvent<HTMLInputElement>): void;
}

function Form({ onSubmit, inputs, handleChange, submitBtnName }: Props) {
  return (
    <form onSubmit={onSubmit} noValidate className="form">
      {inputs.map(({ label, type, value, error }, i) => (
        <Input
          label={label}
          id={label}
          type={type}
          onChange={e => handleChange(i, e)}
          value={value}
          error={error}
          key={i}
        />
      ))}
      <div className="btn-container">
        <button className="btn" type="submit">
          {submitBtnName}
        </button>
      </div>
    </form>
  );
}

export default Form;
