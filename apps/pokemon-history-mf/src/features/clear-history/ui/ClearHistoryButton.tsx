type ClearHistoryButtonProps = {
  onClear: () => void;
  disabled?: boolean;
};

export function ClearHistoryButton({
  onClear,
  disabled = false,
}: ClearHistoryButtonProps) {
  return (
    <button
      className="rounded-full bg-red-500 px-5 py-3 font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      type="button"
      onClick={onClear}
    >
      Limpiar historial
    </button>
  );
}