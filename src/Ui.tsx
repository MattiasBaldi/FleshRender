import { useTextureStore } from "./stores/useTextureStore";

export function Ui() {
  const texture = useTextureStore((state) => state.texture);
  const setTexture = useTextureStore((state) => state.setTexture);

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
      <div className="flex flex-col top-16  gap-10 fixed  z-50  w-64">
        <input
          className="flex left-4 rounded shadow"
          type="file"
          accept=".jpg,.png"
          onChange={handleFileUpload}
        />
        <img src={texture} alt="image of decal texture"></img>
      </div>
    </>
  );
}
