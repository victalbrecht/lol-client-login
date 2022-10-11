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
const clientRef: HTMLElement = document.querySelector(".client")!;
const clientWindowControlsRef: HTMLElement = document.querySelector(
  ".client__window-controls"
)!;

interface ResolutionProperties {
  width: number;
  height: number;
  fontSize: number;
}

const resolutions: {
  [resolutionKey: string]: ResolutionProperties;
} = {
  1024: { width: 1024, height: 576, fontSize: 11 },
  1280: { width: 1280, height: 720, fontSize: 12 },
  1600: { width: 1600, height: 900, fontSize: 14 },
  1920: { width: 1920, height: 1080, fontSize: 15 },
};

let invalidUsername = true;
let invalidPassword = true;

const handleFloatingLabel = ({
  value,
  classList,
}: Partial<HTMLInputElement>): void => {
  value !== ""
    ? classList!.add(floatingClass)
    : classList!.remove(floatingClass);
};

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

const setDraggableElement = (element: HTMLElement): void => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const elementDrag = (event: MouseEvent): void => {
    event.preventDefault();
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  };

  const dragMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const closeDragElement = (): void => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  clientWindowControlsRef.onmousedown = dragMouseDown;
};

const changeClientSize = ({ value }: Partial<HTMLSelectElement>): void => {
  if (value) {
    const { width, height, fontSize }: ResolutionProperties =
      resolutions[value];

    document.documentElement.style.fontSize = `${fontSize}px`;
    clientRef.style.height = `${height}px`;
    clientRef.style.width = `${width}px`;
  }
};

setDraggableElement(clientRef);
