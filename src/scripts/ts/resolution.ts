interface ResolutionProperties {
  width: number;
  height: number;
  fontSize: number;
  default?: boolean;
}

const resolutionClientRef: HTMLElement = document.getElementById("client")!;

const clientResolutionSelectRef: HTMLSelectElement = document.getElementById(
  "client-resolution-select"
)! as HTMLSelectElement;

const resolutions: Array<ResolutionProperties> = [
  { width: 1024, height: 576, fontSize: 11 },
  { width: 1280, height: 720, fontSize: 12 },
  { width: 1600, height: 900, fontSize: 14, default: true },
  { width: 1920, height: 1080, fontSize: 15 },
];

const handleClientResolutionChanges = ({ value }: HTMLSelectElement): void => {
  const resolution: number = Number(value);
  setClientResolution(resolution);
};

const setClientResolution = (resolution: number): void => {
  const selectedResolution: ResolutionProperties = resolutions.find(
    ({ width }: ResolutionProperties) => width === resolution
  )!;

  const { width, height, fontSize }: ResolutionProperties = selectedResolution;

  document.documentElement.style.fontSize = `${fontSize}px`;
  resolutionClientRef.style.height = `${height}px`;
  resolutionClientRef.style.width = `${width}px`;
};

const setResolutionList = (): void => {
  resolutions.forEach((resolution: ResolutionProperties) => {
    const option: HTMLOptionElement = document.createElement("option");

    option.text = `${resolution.width} x ${resolution.height}`;
    option.value = resolution.width.toString();

    clientResolutionSelectRef.options.add(option);

    if (resolution.default) {
      setClientResolution(resolution.width);
      option.selected = true;
    }
  });
};

setResolutionList();
