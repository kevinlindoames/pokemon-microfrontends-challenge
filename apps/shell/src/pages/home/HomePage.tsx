import { POKEMON_CATEGORIES } from '../../entities/pokemon/model/pokemon-categories';
import { PokemonCategorySection } from '../../widgets/pokemon-category-section/PokemonCategorySection';

export function HomePage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-red-100 bg-white/90 shadow-2xl shadow-red-100/60 backdrop-blur dark:border-cyan-300/20 dark:bg-slate-950/80 dark:shadow-cyan-950/40">
        <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-300 to-sky-400 dark:from-red-500 dark:via-cyan-300 dark:to-blue-500" />

        <div className="p-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 dark:text-cyan-200">
            Pokémon Center
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Explore your Pokédex
          </h1>

          <p className="mt-4 max-w-2xl text-base font-medium text-slate-500 dark:text-slate-400">
            Consulta Pokémon por categoría, revisa sus detalles y conserva un
            historial local de tus visitas.
          </p>
        </div>
      </section>

      {POKEMON_CATEGORIES.map((category) => (
        <PokemonCategorySection
          description={category.description}
          key={category.type}
          label={category.label}
          type={category.type}
        />
      ))}
    </div>
  );
}