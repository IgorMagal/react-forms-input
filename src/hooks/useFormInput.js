import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return initialInputState;
};

const useFormInput = (validateInputFn) => {
  const [inputState, dispatchFn] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const inputIsValid = validateInputFn(inputState.value);
  const inputHasError = !inputIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatchFn({ type: "INPUT", value: event.target.value });
  };

  const inputInputBlurHandler = () => {
    dispatchFn({ type: "BLUR" });
  };

  const resetInput = () => {
    dispatchFn({ type: "RESET" });
  };

  const inputClasses = inputHasError ? "form-control invalid" : "form-control";

  return {
    input: inputState.value,
    hasError: inputHasError,
    isValid: inputIsValid,
    classes: inputClasses,
    changeHandler: inputChangeHandler,
    blurHandler: inputInputBlurHandler,
    reset: resetInput,
  };
};

export default useFormInput;
