import useFormInput from "../hooks/useFormInput";

// Sets invalidations on blue and submit, checks for validation on keystroke.

const SimpleInput = (props) => {
  //Name field logic.
  const {
    input: enteredName,
    hasError: nameInputHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetNameInput,
    isValid: enteredNameIsValid,
    classes: nameInputClasses,
  } = useFormInput((val) => val.trim() !== "");
  //
  // Email field logic.
  const {
    input: enteredEmail,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmailInput,
    isValid: enteredEmailIsValid,
    classes: emailInputClasses,
  } = useFormInput((val) =>
    // eslint-disable-next-line no-useless-escape
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
  );
  //

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    console.log(`name: ${enteredName} email: ${enteredEmail}`);
    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Entered name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Please provide a valid email address</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
