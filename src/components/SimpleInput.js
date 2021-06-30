import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enterednameTouched, setEnteredNameTouched] = useState();

  const nameInputChangeHander = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    
    //all inputs are touched by user by now bc user has to check over before submitting
    setEnteredNameTouched(true);
    
    if (enteredName.trim() == "") {
      //trrim removes white space
      setEnteredNameIsValid(false);
      return; //exits if no input and doesnt send in request to server
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    // nameInputRef.current.value=''; => not ideal, dont manipulate the dom
    setEnteredName("");
  };

  const nameInputIsInvalid = !enteredNameIsValid && enterednameTouched; // boolean

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHander}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
