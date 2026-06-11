
# Pokémon Microfrontends Challenge

Aplicación frontend construida con **React 18**, **TypeScript**, **Vite** y **Module Federation**, basada en PokeAPI.

El proyecto implementa una arquitectura de microfrontends con un **Shell principal** y dos microfrontends remotos:

- **Shell**: autenticación, navegación, layout global, home, búsqueda fullscreen, tema claro/oscuro y toast global.
- **Pokémon Detail MF**: detalle premium tipo Pokédex.
- **Pokémon History MF**: historial persistente de Pokémon visitados.

---

## 1. Descripción del proyecto

Este proyecto resuelve un reto técnico frontend orientado a una arquitectura modular y escalable usando microfrontends.

La aplicación permite:

- Iniciar sesión con un login mock.
- Navegar por rutas protegidas.
- Visualizar categorías Pokémon.
- Buscar Pokémon en un modal fullscreen con infinite scroll.
- Ver una ficha detallada tipo Pokédex.
- Registrar historial de Pokémon visitados.
- Mostrar un toast con el último Pokémon visitado al recargar.
- Alternar entre modo claro y oscuro.
- Ejecutar tests unitarios y de componentes.

---

## 2. Stack técnico

### Core

- React 18
- TypeScript
- Vite
- Module Federation con `@originjs/vite-plugin-federation`
- React Router DOM
- Tailwind CSS
- Zustand
- TanStack Query
- Vitest
- React Testing Library
- PokeAPI

### Arquitectura

- Monorepo con npm workspaces
- Microfrontends
- Feature-Sliced Design adaptado
- Shared package para lógica común
- Separación por capas: `app`, `pages`, `widgets`, `features`, `entities`, `shared`

---

## 3. Arquitectura general

```txt
pokemon-microfrontends-challenge/
├── apps/
│   ├── shell/
│   ├── pokemon-detail-mf/
│   └── pokemon-history-mf/
├── packages/
│   └── shared/
├── package.json
├── vitest.config.ts
├── vitest.setup.ts
└── README.md
````

---

## 4. Microfrontends

### Shell

Ubicación:

```txt
apps/shell
```

Puerto:

```txt
http://localhost:3000
```

Responsabilidades:

* Login mock.
* Sesión en `localStorage`.
* Rutas protegidas.
* Layout global.
* Home con categorías.
* Buscador fullscreen.
* Tema claro/oscuro.
* Toast de último Pokémon visitado.
* Consumo de remotes mediante Module Federation.

---

### Pokémon Detail MF

Ubicación:

```txt
apps/pokemon-detail-mf
```

Puerto:

```txt
http://localhost:3001
```

Expone:

```txt
pokemonDetailMf/PokemonDetail
```

Responsabilidades:

* Consultar detalle del Pokémon.
* Consultar species.
* Consultar evolution chain.
* Mostrar ficha Pokédex premium.
* Registrar visita.
* Actualizar último Pokémon visitado.

Datos mostrados:

* Imagen principal.
* Número Pokédex.
* Nombre.
* Tipos.
* Descripción Pokédex.
* Altura.
* Peso.
* Experiencia base.
* Habilidades normales y ocultas.
* Cry / sonido.
* Evoluciones simples y ramificadas.
* Stats.
* Movimientos principales.

---

### Pokémon History MF

Ubicación:

```txt
apps/pokemon-history-mf
```

Puerto:

```txt
http://localhost:3002
```

Expone:

```txt
pokemonHistoryMf/PokemonHistory
```

Responsabilidades:

* Leer historial desde `localStorage`.
* Mostrar Pokémon visitados.
* Mostrar contador de visitas.
* Mostrar fecha de última visita.
* Limpiar historial.
* Mostrar estado vacío.

---

## 5. Estructura interna por aplicación

Cada aplicación sigue una estructura Feature-Sliced adaptada:

```txt
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

### Capas

* `app`: providers, router, configuración global.
* `pages`: páginas de alto nivel.
* `widgets`: bloques grandes de UI.
* `features`: funcionalidades de usuario.
* `entities`: dominio principal, API, mappers y componentes de entidad.
* `shared`: utilidades internas reutilizables por app.

---

## 6. Shared package

Ubicación:

```txt
packages/shared
```

Responsabilidades:

* Tipos compartidos.
* Constantes de `localStorage`.
* Helpers de storage seguro.
* Normalización de nombres.
* Selección de imágenes Pokémon.
* Registro de visitas.
* Lógica de último Pokémon visitado.
* Tipos de historial.

Ejemplos:

```txt
normalizePokemonName
getPokemonImage
savePokemonVisit
getPokemonHistory
setLastVisitedPokemon
shouldShowLastVisitedToast
dismissLastVisitedToast
```

---

## 7. Instalación

Desde la raíz del proyecto:

```bash
npm install
```

---

## 8. Scripts principales

### Ejecutar Shell en modo desarrollo

```bash
npm run dev:shell
```

### Ejecutar Detail MF

```bash
npm run dev:detail
```

### Ejecutar History MF

```bash
npm run dev:history
```

---

## 9. Ejecutar proyecto federado

Para Module Federation con Vite, los remotes deben compilarse y servirse en modo preview.

Primero construir remotes:

```bash
npm run build:remotes
```

Luego ejecutar el entorno federado:

```bash
npm run dev:federated
```

Esto levanta:

```txt
Shell              http://localhost:3000
Pokémon Detail MF  http://localhost:3001
Pokémon History MF http://localhost:3002
```

---

## 10. Build

### Build del Shell

```bash
npm run build:shell
```

### Build de Detail MF

```bash
npm run build:detail
```

### Build de History MF

```bash
npm run build:history
```

### Build de remotes

```bash
npm run build:remotes
```

---

## 11. Testing

El proyecto usa:

* Vitest
* React Testing Library
* jest-dom
* jsdom
* user-event

Ejecutar tests:

```bash
npm test
```

Modo watch:

```bash
npm run test:watch
```

---

## 12. Cobertura actual de tests

### Tests de lógica

* `normalizePokemonName`
* `getPokemonImage`
* `savePokemonVisit`
* `getPokemonHistory`
* `clearPokemonHistory`
* `setLastVisitedPokemon`
* `shouldShowLastVisitedToast`
* `dismissLastVisitedToast`
* `validateLoginForm`
* `mapTypeResponseToPokemonSummaries`
* `mapEvolutionChain`
* `cleanFlavorText`

### Tests de componentes

* `PokemonCard`
* `PokemonSearchButton`
* `ClearHistoryButton`
* `PlayPokemonCryButton`

Resultado validado:

```txt
Test Files  12 passed
Tests       39 passed
```

---

## 13. Rutas

```txt
/login
/home
/pokemon/:pokemonId
/history
```

### Protección de rutas

Las rutas principales están protegidas. Si no existe sesión, el usuario es redirigido a:

```txt
/login
```

---

## 14. Login y sesión

El login es mock.

Validaciones:

* Email obligatorio.
* Email con formato válido.
* Password obligatorio.
* Password mínimo de 6 caracteres.

Cualquier email válido puede iniciar sesión.

La sesión se almacena en:

```txt
localStorage
```

---

## 15. Home

El Home muestra categorías Pokémon iniciales:

```txt
fire
water
grass
electric
psychic
rock
```

Cada categoría consulta PokeAPI y muestra una selección de Pokémon.

Endpoint usado:

```txt
GET /type/{type}
```

---

## 16. Buscador fullscreen

El buscador está implementado como modal fullscreen global dentro del Shell.

Características:

* Apertura desde el header.
* Cierre con botón.
* Cierre con tecla Escape.
* Infinite scroll.
* Carga paginada de 30 en 30.
* Búsqueda parcial por nombre.
* Resultados cacheados con TanStack Query.
* Navegación al detalle al seleccionar un Pokémon.

Endpoints usados:

```txt
GET /pokemon?limit=30&offset=0
GET /pokemon?limit=1300&offset=0
```

La búsqueda parcial se realiza en frontend porque PokeAPI no provee búsqueda parcial nativa por nombre.

Ejemplos:

```txt
pika → pikachu
char → charmander, charmeleon, charizard
saur → bulbasaur, ivysaur, venusaur
eev → eevee
```

---

## 17. Detail MF: Pokédex premium

El microfrontend de detalle combina tres recursos de PokeAPI:

```txt
GET /pokemon/{id or name}
GET /pokemon-species/{id or name}
GET /evolution-chain/{id}
```

Con esto se construye una ficha tipo Pokédex más completa.

### Información mostrada

* Imagen principal.
* ID.
* Nombre.
* Tipos.
* Descripción.
* Métricas.
* Habilidades.
* Cry.
* Evoluciones.
* Stats.
* Movimientos principales.

### Evoluciones

PokeAPI representa las evoluciones como un árbol. Para mantener una UI simple y flexible, el árbol evolutivo se normaliza a una lista de cards.

Esto permite soportar:

### Evolución lineal

```txt
Pichu → Pikachu → Raichu
```

### Evolución ramificada

```txt
Eevee → Vaporeon / Jolteon / Flareon / Espeon / Umbreon / ...
```

---

## 18. Historial

Cada vez que el usuario entra al detalle de un Pokémon:

* Se registra la visita.
* Si el Pokémon ya existe en historial, se incrementa el contador.
* Se actualiza `lastVisitedAt`.
* Se guarda el último Pokémon visitado.
* Se reactiva el toast global.

Tipo usado:

```ts
type VisitedPokemon = {
  id: number;
  name: string;
  image: string;
  visits: number;
  lastVisitedAt: string;
};
```

---

## 19. Toast de último Pokémon visitado

Al recargar la aplicación, si existe un último Pokémon visitado, se muestra un toast global.

Reglas:

* Si existe último visitado y el toast no fue cerrado, se muestra.
* Si el usuario cierra el toast, no vuelve a aparecer.
* Si el usuario visita otro Pokémon, el toast se reactiva.

---

## 20. Tema claro / oscuro

La aplicación soporta modo claro y oscuro.

Decisión visual:

```txt
Modo claro  → Pokémon Center + Pokédex clásica
Modo oscuro → Pokédex digital / scanner
```

El tema se persiste en `localStorage`.

---

## 21. Performance y UX

Mejoras implementadas:

* Infinite scroll en buscador.
* Cache de datos con TanStack Query.
* Lazy loading en imágenes de listas, historial y evoluciones.
* `decoding="async"` en imágenes.
* `fetchPriority="high"` en imagen principal del detalle.
* Skeleton states.
* Empty states.
* Error states.
* Carga remota con `Suspense`.
* Búsqueda parcial en frontend.
* Normalización de nombres ingresados por usuario.
* Separación de lógica en mappers y helpers testeables.

---

## 22. Decisiones técnicas

### React 18

Se usa React 18 para mantener compatibilidad estable con Module Federation y el ecosistema actual del reto.

### Vite

Se usa Vite por rapidez de desarrollo, build eficiente y compatibilidad con federation mediante plugin.

### Module Federation

Se eligió Module Federation para dividir la aplicación en un Shell y microfrontends independientes.

### Zustand

Se usa Zustand para estado global simple:

* Auth.
* Theme.
* Search modal.

### TanStack Query

Se usa TanStack Query para:

* Cache.
* Fetching declarativo.
* Infinite queries.
* Manejo de loading/error.
* Stale time.

### Shared package

Se creó `packages/shared` para evitar duplicación de tipos y lógica común.

---

## 23. Limitaciones conocidas

* El login es mock y no usa backend real.
* La búsqueda parcial se realiza en frontend porque PokeAPI no tiene búsqueda parcial nativa.
* El historial se almacena en `localStorage`.
* Las evoluciones se muestran como cards normalizadas, no como árbol visual con ramas conectadas.
* No se implementó internacionalización completa.
* No se implementó cobertura total de todos los componentes.

---

## 24. Mejoras futuras

* Agregar cobertura de tests para `LoginForm`.
* Agregar tests para `PokemonSearchModal`.
* Agregar tests de integración para flujo login → home → detalle → historial.
* Implementar árbol visual de evolución con conectores.
* Agregar favoritos.
* Agregar filtros por tipo en el buscador.
* Agregar ordenamiento por ID, nombre o tipo.
* Agregar paginación virtualizada para listas grandes.
* Agregar i18n.
* Agregar CI/CD con ejecución de tests y build.
* Agregar despliegue independiente por microfrontend.
* Agregar Storybook para documentación visual de componentes.

---

## 25. Cómo explicar el proyecto

Este proyecto implementa una arquitectura frontend basada en microfrontends usando React, Vite y Module Federation. El Shell centraliza la experiencia global, autenticación, tema, rutas y búsqueda, mientras que los microfrontends de detalle e historial encapsulan funcionalidades específicas.

El detalle Pokémon fue enriquecido como una Pokédex premium combinando datos de `pokemon`, `pokemon-species` y `evolution-chain`. Además, se implementaron persistencia de historial, toast de último visitado, búsqueda fullscreen con infinite scroll, optimización de imágenes y una estrategia de testing con Vitest y React Testing Library.

---

## 26. Estado actual

```txt
Login mock                 ✅
Rutas protegidas           ✅
Tema claro / oscuro        ✅
Home por categorías        ✅
Buscador fullscreen        ✅
Infinite scroll            ✅
Búsqueda parcial           ✅
Detail MF                  ✅
Pokédex premium            ✅
Evolution chain            ✅
History MF                 ✅
Historial persistente      ✅
Toast último visitado      ✅
Lazy loading imágenes      ✅
Tests de lógica            ✅
Tests de componentes       ✅
Build Shell                ✅
Build Remotes              ✅

