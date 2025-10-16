import { useUiStore } from "../../stores/useUiStore.ts";

export function FileUploader() {
  const texture = useUiStore((state) => state.texture);
  const setTexture = useUiStore((state) => state.setTexture);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result == "string") {
          setTexture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        className="flex left-4 rounded shadow"
        type="file"
        accept=".jpg,.png"
        onChange={handleFileUpload}
      />
      <img src={texture} alt="image of decal texture"></img>
    </>
  );
}
