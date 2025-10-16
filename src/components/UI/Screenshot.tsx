export function Screenshot() {
  const captureScreenShot = () => {
    const canvas = document.querySelector(".webgl canvas");
    if (canvas && canvas instanceof HTMLCanvasElement) {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "screenshot.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <>
      <button
        className="hover:cursor-pointer w-fit"
        onClick={() => captureScreenShot()}
      >
        <span role="img" aria-label="camera">
          📸
        </span>
      </button>
    </>
  );
}
