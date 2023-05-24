const clientWindowControlsRef: HTMLElement = document.getElementById(
  "client-window-controls"
)!;

const draggableClientRef: HTMLElement = document.getElementById("client")!;

let pos1: number = 0;
let pos2: number = 0;
let pos3: number = 0;
let pos4: number = 0;

const elementDrag = (event: MouseEvent): void => {
  event.preventDefault();

  pos1 = pos3 - event.clientX;
  pos2 = pos4 - event.clientY;
  pos3 = event.clientX;
  pos4 = event.clientY;

  draggableClientRef.style.top = draggableClientRef.offsetTop - pos2 + "px";
  draggableClientRef.style.left = draggableClientRef.offsetLeft - pos1 + "px";
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

const setDraggableClient = (): void => {
  clientWindowControlsRef.onmousedown = dragMouseDown;
};

setDraggableClient();