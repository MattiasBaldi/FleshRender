import { useFilter } from "../../hooks/useFilter";

export function Link() {
  const { filter, setFilter, serialize } = useFilter();
  const shareUrl = window.location.origin + window.location.pathname + serialize(filter) // prettier-ignore

  return (
    <div className="flex gap-10">
      <a className="w-100 italic truncate">{shareUrl}</a>
      <button
        onClick={() => navigator.clipboard.writeText(shareUrl)}
        className="cursor-pointer"
      >
        share
      </button>
    </div>
  );
}
