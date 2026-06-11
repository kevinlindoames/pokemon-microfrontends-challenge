type PlayPokemonCryButtonProps = {
  cry?: string;
};

export function PlayPokemonCryButton({ cry }: PlayPokemonCryButtonProps) {
  function handlePlayCry() {
    if (!cry) {
      return;
    }

    const audio = new Audio(cry);
    void audio.play();
  }

  return (
    <button
      className="rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-black text-sky-700 shadow-sm transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
      disabled={!cry}
      type="button"
      onClick={handlePlayCry}
    >
      ▶ Play cry
    </button>
  );
}