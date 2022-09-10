import { useState } from "react";

const useFormInput = (validateInputFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateInputFn(enteredValue);
  const inputHasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputInputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const inputClasses = inputHasError ? "form-control invalid" : "form-control";

  return {
    input: enteredValue,
    hasError: inputHasError,
    isValid: inputIsValid,
    classes: inputClasses,
    changeHandler: inputChangeHandler,
    blurHandler: inputInputBlurHandler,
    reset: resetInput,
  };
};

export default useFormInput;
