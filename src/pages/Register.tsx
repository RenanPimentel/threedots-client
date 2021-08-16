import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import Form from "../components/Form";
import { authContext } from "../context/Auth";
import { REGISTER } from "../mutations";
import { handleError, handleUpdate } from "../util/handleAuthMutation";

function Register() {
  const context = useContext(authContext);
  const [inputs, setInputs] = useState<Input[]>([
    {
      label: "Username",
      type: "text",
      value: "",
      name: "username",
      error: "",
    },
    {
      label: "Email",
      type: "email",
      value: "",
      name: "email",
      error: "",
    },
    {
      label: "Password",
      type: "password",
      value: "",
      name: "password",
      error: "",
    },
    {
      label: "Confirm password",
      type: "password",
      value: "",
      name: "confirmPassword",
      error: "",
    },
  ]);
  const [register] = useMutation(REGISTER, {
    variables: inputs.reduce(
      (acc, input) => ({ ...acc, [input.name]: input.value }),
      {}
    ),

    onError(err) {
      handleError(err, inputs, setInputs);
    },

    update(_, result) {
      handleUpdate(result, "register", context.setUser);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    register();
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(
      inputs.map((input, j) =>
        i === j ? { ...input, value: e.target.value } : input
      )
    );
  };

  return (
    <section>
      <h1>Register</h1>
      <Form
        inputs={inputs}
        submitBtnName="Register"
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </section>
  );
}

export default Register;
