import { useState } from "react";

const useFormInput = (validateInputFn) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateInputFn(enteredInput);
  const inputHasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputInputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredInput("");
    setIsTouched(false);
  };

  const inputClasses = inputHasError ? "form-control invalid" : "form-control";

  return {
    input: enteredInput,
    hasError: inputHasError,
    isValid: inputIsValid,
    classes: inputClasses,
    changeHandler: inputChangeHandler,
    blurHandler: inputInputBlurHandler,
    reset: resetInput,
  };
};

export default useFormInput;
