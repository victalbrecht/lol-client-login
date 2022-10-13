const invalidInputClass: string = "client__login-area__body__input--invalid";

const floatingClass: string = "client__login-area__body__input--floating-label";

const visibleInvalidCharactersSmallClass: string =
  "client__login-area__body__input__small--invalid-characters--visible";

const visibleFewCharactersSmallClass: string =
  "client__login-area__body__input__small--few-characters--visible";

const invalidCharactersSmallRef: HTMLElement = document.querySelector(
  ".client__login-area__body__input__small--invalid-characters"
)!;

const fewCharactersSmallRef: HTMLElement = document.querySelector(
  ".client__login-area__body__input__small--few-characters"
)!;

const loginButtonRef: HTMLButtonElement = document.querySelector(
  ".client__login-area__footer__login-button"
)!;

let invalidUsername = true;
let invalidPassword = true;

const isInvalidUsernameLength = (username: string): boolean =>
  username.length < 2;

const isInvalidUsernamePattern = (username: string): boolean =>
  new RegExp(/[^A-Za-z0-9_\-$]/).test(username);

const handleFloatingLabel = ({
  value,
  classList,
}: Partial<HTMLInputElement>): void => {
  value !== ""
    ? classList!.add(floatingClass)
    : classList!.remove(floatingClass);
};

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
  fewCharactersSmallRef.classList.remove(visibleFewCharactersSmallClass);
  invalidCharactersSmallRef.classList.remove(
    visibleInvalidCharactersSmallClass
  );

  if (value !== "") {
    invalidUsername && classList!.add(invalidInputClass);

    if (isInvalidUsernameLength(value!)) {
      fewCharactersSmallRef.hidden = false;
      fewCharactersSmallRef.classList.add(visibleFewCharactersSmallClass);
    } else if (isInvalidUsernamePattern(value!)) {
      invalidCharactersSmallRef.hidden = false;
      invalidCharactersSmallRef.classList.add(
        visibleInvalidCharactersSmallClass
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
