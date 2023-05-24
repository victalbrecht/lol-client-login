const usernameInputRef: HTMLInputElement = document.getElementById(
  "username-input"
)! as HTMLInputElement;

const invalidCharactersSmallRef: HTMLElement = document.getElementById(
  "invalid-chars-small"
)!;

const fewCharactersSmallRef: HTMLElement =
  document.getElementById("few-chars-small")!;

const loginButtonRef: HTMLButtonElement = document.getElementById(
  "login-btn"
)! as HTMLButtonElement;

const invalidInputClass: string = "client__input__field--invalid";
const visibleSmallClass: string = "client__input__small--visible";

let validUsername: boolean = false;
let validPassword: boolean = false;

const updateFormSubmitButtonState = (): void => {
  const validForm: boolean = validUsername && validPassword;

  if (!validForm) {
    loginButtonRef.setAttribute("disabled", "disabled");
    return;
  }

  loginButtonRef.removeAttribute("disabled");
};

const resetAllUsernameValidators = (): void => {
  showUsernameLengthValidator(false);
  showUsernamePatternValidator(false);
  usernameInputRef.classList.remove(invalidInputClass);
};

const showUsernameLengthValidator = (show: boolean): void => {
  fewCharactersSmallRef.hidden = !show;

  if (!show) {
    fewCharactersSmallRef.classList.remove(visibleSmallClass);
    return;
  }
  
  usernameInputRef.classList.add(invalidInputClass);
  fewCharactersSmallRef.classList.add(visibleSmallClass);
};

const showUsernamePatternValidator = (show: boolean): void => {
  invalidCharactersSmallRef.hidden = !show;

  if (!show) {
    invalidCharactersSmallRef.classList.remove(visibleSmallClass);
    return;
  }
  
  usernameInputRef.classList.add(invalidInputClass);
  invalidCharactersSmallRef.classList.add(visibleSmallClass);
};

const handleUsernameValueChanges = ({ value }: HTMLInputElement): void => {
  validUsername = false;

  resetAllUsernameValidators();
  
  updateFormSubmitButtonState();

  const hasUsername: boolean = value !== "";

  if (!hasUsername) {
    return;
  }

  const validUsernameLength: boolean = value.length >= 2;

  if (!validUsernameLength) {
    showUsernameLengthValidator(true);
    showUsernamePatternValidator(false);
    return;
  }

  const validUsernamePattern: boolean = new RegExp(/^[\w]+$/).test(value);

  if (!validUsernamePattern) {
    showUsernameLengthValidator(false);
    showUsernamePatternValidator(true);
    return;
  }

  validUsername = true;

  resetAllUsernameValidators();
  updateFormSubmitButtonState();
};

const handlePasswordValueChanges = ({ value }: HTMLInputElement): void => {
  validPassword = false;

  updateFormSubmitButtonState();

  const hasPassword: boolean = value !== "";

  if (!hasPassword) {
    return;
  }

  validPassword = true;

  updateFormSubmitButtonState();
};
