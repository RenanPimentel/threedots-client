import { ApolloError, FetchResult } from "@apollo/client";

type Result = Omit<
  FetchResult<any, Record<string, any>, Record<string, any>>,
  "context"
>;

export function handleError(
  err: ApolloError,
  inputs: Input[],
  setInputs: (inputs: Input[]) => void
): void {
  const errors = err.graphQLErrors[0].extensions?.errors;
  const inputsWithError = inputs.map(input => ({ ...input, error: "" }));

  if (!errors) return;

  Object.entries(errors).forEach(([key, value]) => {
    const input = inputsWithError.find(input => input.name === key);
    if (!input) return;

    input.error = String(value);
  });

  setInputs(inputsWithError);
}

export function handleUpdate(
  result: Result,
  on: "register" | "login",
  setUser?: (user: MainUser) => void,
  cb?: CallableFunction
): void {
  const data: Obj & MainUser = result.data[on];
  if (!data) throw new Error("handleUpdate wrong 'on' argument");

  const { avatar, createdAt, email, id, password, token, username } = data;

  if (setUser) {
    setUser({ avatar, createdAt, email, id, password, token, username });
  }

  if (cb) cb();
}
