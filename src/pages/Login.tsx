import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import Form from "../components/Form";
import { authContext } from "../context/Auth";
import { LOGIN } from "../mutations";
import { handleError, handleUpdate } from "../util/handleAuthMutation";

function Login() {
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
      label: "Password",
      type: "password",
      value: "",
      name: "password",
      error: "",
    },
  ]);
  const [login] = useMutation(LOGIN, {
    variables: inputs.reduce(
      (acc, input) => ({ ...acc, [input.name]: input.value }),
      {}
    ),

    onError(err) {
      handleError(err, inputs, setInputs);
    },

    update(_, result) {
      handleUpdate(result, "login", context.setUser);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    login();
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
      <h1>Login</h1>
      <Form
        inputs={inputs}
        submitBtnName="Login"
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </section>
  );
}

export default Login;
