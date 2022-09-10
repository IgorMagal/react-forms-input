import useFormInput from "../hooks/useFormInput";

const BasicForm = (props) => {
  const {
    input: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    reset: resetEnteredFirstName,
    changeHandler: enteredFirstNameChangeHandler,
    blurHandler: enteredFirstNameBlurHandler,
    classes: enteredFirstNameStyle,
  } = useFormInput((val) => val.trim() !== "");

  const {
    input: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    reset: resetEnteredLastName,
    changeHandler: enteredLastNameChangeHandler,
    blurHandler: enteredLastNameBlurHandler,
    classes: enteredLastNameStyle,
  } = useFormInput((val) => val.trim() !== "");

  const {
    input: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    reset: resetEmailInput,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    classes: emailInputStyle,
  } = useFormInput((val) =>
    // eslint-disable-next-line no-useless-escape
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
  );

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(
      `first name: ${enteredFirstName}\nlast name: ${enteredLastName}\nemail: ${enteredEmail}`
    );
    resetEnteredFirstName();
    resetEnteredLastName();
    resetEmailInput();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={enteredFirstNameStyle}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="fname"
            onChange={enteredFirstNameChangeHandler}
            onBlur={enteredFirstNameBlurHandler}
            value={enteredFirstName}
          />
        </div>
        {enteredFirstNameHasError && (
          <p className="error-text">First name cannot be empty.</p>
        )}
        <div className={enteredLastNameStyle}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="lname"
            onChange={enteredLastNameChangeHandler}
            onBlur={enteredLastNameBlurHandler}
            value={enteredLastName}
          />
        </div>
        {enteredLastNameHasError && (
          <p className="error-text">Last name cannot be empty.</p>
        )}
      </div>
      <div className={emailInputStyle}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailHasError && (
        <p className="error-text">Please enter a valid email.</p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
