const clientResolutionSelectRef: HTMLSelectElement = document.querySelector(
  ".client__resolution-selector"
)!;

interface ResolutionProperties {
  width: number;
  height: number;
  fontSize: number;
}

const resolutions: Array<ResolutionProperties> = [
  { width: 1024, height: 576, fontSize: 11 },
  { width: 1280, height: 720, fontSize: 12 },
  { width: 1600, height: 900, fontSize: 14 },
  { width: 1920, height: 1080, fontSize: 15 },
];

const changeClientResolution = ({
  value,
}: Partial<HTMLSelectElement>): void => {
  if (value !== "") {
    const { width, height, fontSize }: ResolutionProperties =
      resolutions[Number(value)];

    document.documentElement.style.fontSize = `${fontSize}px`;
    clientRef.style.height = `${height}px`;
    clientRef.style.width = `${width}px`;
  }
};

resolutions.forEach((resolution: ResolutionProperties, index: number) => {
  const option: HTMLOptionElement = document.createElement("option");

  option.text = `${resolution.width} x ${resolution.height}`;
  option.value = index.toString();

  clientResolutionSelectRef.options.add(option);
});
