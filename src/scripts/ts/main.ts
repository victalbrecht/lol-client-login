const handleFloatingLabel = ({
  value,
  classList,
}: Partial<HTMLInputElement>) => {
  const floatingClass: string = "client__login-area__body__input--floating-label";

  value !== ""
    ? classList!.add(floatingClass)
    : classList!.remove(floatingClass);
};

const handleUserNameValidation = ({ value }: Partial<HTMLInputElement>) => {
  if (new RegExp(/[A-Za-z]/).test(value)) {
    
  }
};
