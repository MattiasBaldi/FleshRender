import { Link } from "./Link.tsx";
import { FileUploader } from "./FileUploader.tsx";

export function Ui() {
  return (
    <>
      <div className="flex flex-col top-16  gap-10 fixed  z-50  w-64">
        <Link />
        <FileUploader />
      </div>
    </>
  );
}
