import { useReducer } from "react";

type State = { status: "idle" | "successful" | "failed"; error: string | null; message: string | null };
type Action =
  | { type: "setSuccessful"; payload: { message: string } }
  | { type: "setFailed"; payload: { error: string } };

function reducer(_: State, action: Action): State {
  switch (action.type) {
    case "setSuccessful":
      return { status: "successful", error: null, message: action.payload.message };
    case "setFailed":
      return { status: "failed", error: action.payload.error, message: null };
  }
}

const useLogin = () => useReducer(reducer, { status: "idle", error: null, message: null });

export default useLogin;
