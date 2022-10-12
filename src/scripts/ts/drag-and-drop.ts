export const setDraggableElement = (element: HTMLElement): void => {
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