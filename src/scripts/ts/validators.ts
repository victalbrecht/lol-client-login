const invalidInputClass: string = "client__input--invalid";

const visibleSmallClass: string =
  "client__input__small--visible";

const invalidCharactersSmallRef: HTMLElement = document.getElementById(
  "invalid-chars-small"
)!;

const fewCharactersSmallRef: HTMLElement =
  document.getElementById("few-chars-small")!;

const loginButtonRef: HTMLButtonElement = document.getElementById(
  "login-btn"
)! as HTMLButtonElement;

let invalidUsername = true;
let invalidPassword = true;

const isInvalidUsernameLength = (username: string): boolean =>
  username.length < 2;

const isInvalidUsernamePattern = (username: string): boolean =>
  new RegExp(/[^A-Za-z0-9_\-$]/).test(username);

const handleUsernameValidation = ({
  value,
}: Partial<HTMLInputElement>): void => {
  invalidUsername =
    value === "" ||
    isInvalidUsernameLength(value!) ||
    isInvalidUsernamePattern(value!);
};

const handleUsernameErrorHints = ({
  value,
  classList,
}: Partial<HTMLInputElement>): void => {
  invalidCharactersSmallRef.hidden = true;
  fewCharactersSmallRef.hidden = true;
  classList!.remove(invalidInputClass);
  fewCharactersSmallRef.classList.remove(visibleSmallClass);
  invalidCharactersSmallRef.classList.remove(
    visibleSmallClass
  );

  if (value !== "") {
    invalidUsername && classList!.add(invalidInputClass);

    if (isInvalidUsernameLength(value!)) {
      fewCharactersSmallRef.hidden = false;
      fewCharactersSmallRef.classList.add(visibleSmallClass);
    } else if (isInvalidUsernamePattern(value!)) {
      invalidCharactersSmallRef.hidden = false;
      invalidCharactersSmallRef.classList.add(
        visibleSmallClass
      );
    }
  }
};

const handlePasswordValidation = ({
  value,
}: Partial<HTMLInputElement>): void => {
  invalidPassword = value === "";
};

const updateLoginButton = (): void => {
  invalidUsername || invalidPassword
    ? loginButtonRef.setAttribute("disabled", "disabled")
    : loginButtonRef.removeAttribute("disabled");
};
