import { Link } from "./Link.tsx";
import { FileUploader } from "./FileUploader.tsx";
import { Screenshot } from "./Screenshot.tsx";

export function Ui() {
  return (
    <>
      <div className="flex flex-col top-16  gap-10 fixed  z-50  w-64">
        <div className="flex gap-2">
          <Link />
          <Screenshot />
        </div>
        <FileUploader />
      </div>
    </>
  );
}
