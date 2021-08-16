interface Action {
  type: string;
  payload: any;
}

type Reducer = (state: AuthContextState, action: Action) => AuthContextState;

export const reducer: Reducer = (state, action) => {
  if (action.type === "SET_USER") {
    return { ...state, user: action.payload };
  }

  throw new Error("authReducer");
};
