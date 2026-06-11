# Pokémon Microfrontends Challenge

Aplicación frontend construida con **React 18**, **TypeScript**, **Vite**, **Module Federation** y **PokeAPI**.

El proyecto implementa una arquitectura de microfrontends con un **Shell principal** y dos microfrontends remotos desplegados de forma independiente.

## Demo en producción

### Shell

```txt
https://pokemon-shell-mf.netlify.app/
```

### Microfrontends remotos

```txt
Pokémon Detail MF:
https://pokemon-detail-mf.netlify.app/

Pokémon History MF:
https://pokemon-history-mf.netlify.app/
```

### Remote entries

```txt
Detail MF:
https://pokemon-detail-mf.netlify.app/assets/remoteEntry.js

History MF:
https://pokemon-history-mf.netlify.app/assets/remoteEntry.js
```

## Repositorio

```txt
https://github.com/kevinlindoames/pokemon-microfrontends-challenge
```

---

## 1. Descripción

Este proyecto resuelve un reto técnico frontend orientado a arquitectura modular, microfrontends, consumo de APIs, persistencia local, testing, performance, accesibilidad y despliegue independiente.

La aplicación permite:

* Iniciar sesión con un login mock.
* Proteger rutas privadas.
* Visualizar categorías Pokémon en el Home.
* Buscar Pokémon por nombre exacto desde un modal fullscreen accesible.
* Navegar al detalle de un Pokémon.
* Cargar el detalle desde un microfrontend remoto.
* Consultar información extendida tipo Pokédex.
* Registrar historial de Pokémon visitados.
* Cargar el historial desde otro microfrontend remoto.
* Mostrar un toast con el último Pokémon visitado.
* Alternar entre modo claro y oscuro.
* Ejecutar tests unitarios y de componentes.
* Desplegar Shell y remotes de forma independiente en Netlify.

---

## 2. Stack técnico

### Core

* React 18
* TypeScript
* Vite
* Module Federation con `@originjs/vite-plugin-federation`
* React Router DOM
* Tailwind CSS
* Zustand
* TanStack Query
* Vitest
* React Testing Library
* PokeAPI
* Netlify
* GitHub Actions

### Arquitectura

* Monorepo con npm workspaces.
* Microfrontends.
* Feature-Sliced Design adaptado.
* Shared package para lógica común.
* UI package para Design System compartido.
* Separación por capas: `app`, `pages`, `widgets`, `features`, `entities`, `shared`.

---

## 3. Arquitectura general

```txt
pokemon-microfrontends-challenge/
├── apps/
│   ├── shell/
│   ├── pokemon-detail-mf/
│   └── pokemon-history-mf/
├── packages/
│   ├── shared/
│   └── ui/
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
├── package-lock.json
├── vitest.config.ts
├── vitest.setup.ts
├── .nvmrc
└── README.md
```

---

## 4. Microfrontends

## 4.1 Shell

Ubicación:

```txt
apps/shell
```

Puerto local:

```txt
http://localhost:3000
```

Producción:

```txt
https://pokemon-shell-mf.netlify.app/
```

Responsabilidades:

* Login mock.
* Sesión en `localStorage`.
* Rutas protegidas.
* Layout global.
* Home por categorías.
* Buscador fullscreen.
* Tema claro/oscuro.
* Toast global de último Pokémon visitado.
* Carga dinámica de remotes mediante Module Federation.
* Manejo de errores remotos con `ErrorBoundary`.
* Skeletons reutilizables para carga remota.

---

## 4.2 Pokémon Detail MF

Ubicación:

```txt
apps/pokemon-detail-mf
```

Puerto local:

```txt
http://localhost:3001
```

Producción:

```txt
https://pokemon-detail-mf.netlify.app/
```

Remote entry:

```txt
https://pokemon-detail-mf.netlify.app/assets/remoteEntry.js
```

Expone:

```txt
pokemonDetailMf/PokemonDetail
```

Responsabilidades:

* Consultar detalle del Pokémon.
* Consultar species.
* Consultar evolution chain.
* Mostrar ficha tipo Pokédex.
* Registrar visita en historial.
* Actualizar último Pokémon visitado.

Recursos usados:

```txt
GET /pokemon/{id or name}
GET /pokemon-species/{id or name}
GET /evolution-chain/{id}
```

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
* Evoluciones.
* Stats.
* Movimientos principales.

---

## 4.3 Pokémon History MF

Ubicación:

```txt
apps/pokemon-history-mf
```

Puerto local:

```txt
http://localhost:3002
```

Producción:

```txt
https://pokemon-history-mf.netlify.app/
```

Remote entry:

```txt
https://pokemon-history-mf.netlify.app/assets/remoteEntry.js
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

## 5. Estructura interna

Cada aplicación usa una estructura Feature-Sliced adaptada:

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

* `app`: providers, router y configuración global.
* `pages`: páginas de alto nivel.
* `widgets`: bloques grandes de UI.
* `features`: funcionalidades de usuario.
* `entities`: dominio principal, API, mappers y componentes de entidad.
* `shared`: utilidades internas reutilizables por aplicación.

Se evitó mantener carpetas vacías o capas sin responsabilidad actual. La lógica transversal vive en `packages/shared` y la UI reutilizable vive en `packages/ui`.

---

## 6. Packages compartidos

## 6.1 `packages/shared`

Responsabilidades:

* Tipos compartidos.
* Constantes de `localStorage`.
* Helpers de storage seguro.
* Normalización de nombres Pokémon.
* Selección de imágenes oficiales.
* Registro de visitas.
* Lógica de último Pokémon visitado.
* Tipos de historial.

Ejemplos:

```txt
normalizePokemonName
getPokemonImage
registerPokemonVisit
getPokemonHistory
clearPokemonHistory
setLastVisitedPokemon
shouldShowLastVisitedToast
dismissLastVisitedToast
```

## 6.2 `packages/ui`

Design System compartido entre aplicaciones.

Componentes actuales:

```txt
Button
Surface
Skeleton
PokemonPreviewCard
```

Responsabilidades:

* Evitar duplicación visual.
* Unificar cards de Pokémon entre Home y Search.
* Unificar botones.
* Unificar skeletons.
* Unificar superficies visuales.
* Reducir inconsistencias entre modo claro y oscuro.

El Design System no reemplaza el Theme System. El Theme System decide y aplica el modo actual al documento; el Design System renderiza componentes consistentes según ese tema.

---

## 7. Instalación

Requisito recomendado:

```txt
Node 22
```

El proyecto incluye:

```txt
.nvmrc
```

Instalar dependencias:

```bash
npm install
```

O instalación reproducible para CI:

```bash
npm ci
```

---

## 8. Scripts principales

### Ejecutar Shell

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

### Ejecutar proyecto federado localmente

Para Module Federation con Vite, los remotes deben compilarse y servirse en modo preview.

```bash
npm run build:remotes
npm run dev:federated
```

Esto levanta:

```txt
Shell              http://localhost:3000
Pokémon Detail MF  http://localhost:3001
Pokémon History MF http://localhost:3002
```

---

## 9. Build

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

### Build completo por workspaces

```bash
npm run build
```

---

## 10. Testing

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

Resultado validado:

```txt
Test Files  16 passed
Tests       54 passed
```

---

## 11. Cobertura actual de tests

### Tests de lógica

* `normalizePokemonName`
* `getPokemonImage`
* `pokemon-history.storage`
* `last-visited.storage`
* `validateLoginForm`
* `mapTypeResponseToPokemonSummaries`
* `searchPokemonByName`
* `mapEvolutionChain`
* `cleanFlavorText`

### Tests de componentes

* `ProtectedRoute`
* `PokemonCard`
* `PokemonSearchButton`
* `PokemonSearchModal`
* `LastVisitedToast`
* `ClearHistoryButton`
* `PlayPokemonCryButton`

---

## 12. Rutas

```txt
/login
/home
/pokemon/:pokemonId
/history
```

Las rutas principales están protegidas. Si no existe sesión, el usuario es redirigido a:

```txt
/login
```

---

## 13. Login y sesión

El login es mock.

Validaciones:

* Email obligatorio.
* Email con formato válido.
* Password obligatorio.
* Password mínimo de 6 caracteres.

Cualquier email válido con password válido puede iniciar sesión.

La sesión se almacena en `localStorage`.

---

## 14. Home

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

Las cards del Home usan el componente compartido:

```txt
PokemonPreviewCard
```

---

## 15. Buscador fullscreen

El buscador está implementado como modal fullscreen global dentro del Shell.

Características:

* Apertura desde el header.
* Cierre con botón.
* Cierre con tecla Escape.
* Bloqueo de scroll del body mientras está abierto.
* Restauración del foco al cerrar.
* Focus inicial en el input.
* Focus trap con Tab y Shift + Tab.
* Infinite scroll cuando no hay texto de búsqueda.
* Búsqueda exacta cuando el usuario escribe.
* Resultados cacheados con TanStack Query.
* Navegación al detalle al seleccionar un Pokémon.

Endpoint de lista:

```txt
GET /pokemon?limit=30&offset={offset}
```

Endpoint de búsqueda exacta:

```txt
GET /pokemon/{name}
```

La búsqueda usa coincidencia exacta según PokeAPI.

Ejemplos:

```txt
pikachu   → encuentra Pikachu
pika      → no encuentra resultado
charizard → encuentra Charizard
char      → no encuentra resultado
mr mime   → normaliza a mr-mime y encuentra Mr. Mime
```

---

## 16. Accesibilidad

Mejoras implementadas:

* Modal con `role="dialog"`.
* `aria-modal="true"`.
* `aria-labelledby`.
* `aria-describedby`.
* Cierre con Escape.
* Focus trap.
* Restauración del foco al cerrar.
* Estados de carga y error con `aria-live` donde corresponde.
* Botones con `aria-label` cuando aplica.
* Mejoras de contraste en botones principales.

---

## 17. Detail MF: Pokédex

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

Esto permite soportar evolución lineal:

```txt
Pichu → Pikachu → Raichu
```

Y evolución ramificada:

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

La solución se divide en dos capas:

```txt
Theme System:
- Aplica el tema al documento.
- Sincroniza classList, data-theme y colorScheme.
- Evita flash visual al recargar mediante script temprano en index.html.

Design System:
- Renderiza componentes consistentes según el tema activo.
- Evita duplicación de estilos en cards, buttons, skeletons y surfaces.
```

---

## 21. Manejo de remotes

El Shell carga los microfrontends remotos con:

* `React.lazy`.
* `Suspense`.
* `ErrorBoundary`.

Componentes reutilizables:

```txt
RemoteModuleSkeleton
RemoteModuleErrorFallback
```

Esto permite que si un remote falla, el Shell siga funcionando y muestre un fallback controlado.

---

## 22. Performance y UX

Mejoras implementadas:

* Lazy loading de imágenes en listas, historial y evoluciones.
* `decoding="async"` en imágenes.
* Infinite scroll en buscador.
* Cache de datos con TanStack Query.
* Skeleton states.
* Empty states.
* Error states.
* Carga remota con `Suspense`.
* Normalización de nombres ingresados por usuario.
* Separación de lógica en mappers y helpers testeables.
* Reducción de CSS duplicado mediante Design System compartido.
* SEO básico con meta description, manifest y robots.txt.

Resultado PageSpeed validado en Home:

```txt
Performance      100
Accessibility     91
Best Practices   100
SEO              100
```

---

## 23. Decisiones técnicas

### React 18

Se usa React 18 para mantener compatibilidad estable con Module Federation y el ecosistema del reto.

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

### `packages/shared`

Se creó `packages/shared` para evitar duplicación de tipos, storage y lógica común entre Shell y remotes.

### `packages/ui`

Se creó `packages/ui` como Design System compartido para reutilizar UI visual y reducir inconsistencias entre features.

---

## 24. Variables de entorno del Shell

El Shell consume las URLs públicas de los remotes mediante variables de entorno de Vite.

Archivo de ejemplo:

```txt
apps/shell/.env.example
```

Contenido:

```env
VITE_DETAIL_REMOTE_URL=https://TU-DETAIL-MF.netlify.app/assets/remoteEntry.js
VITE_HISTORY_REMOTE_URL=https://TU-HISTORY-MF.netlify.app/assets/remoteEntry.js
```

En Netlify, el sitio del Shell debe tener estas variables configuradas:

```env
VITE_DETAIL_REMOTE_URL=https://pokemon-detail-mf.netlify.app/assets/remoteEntry.js
VITE_HISTORY_REMOTE_URL=https://pokemon-history-mf.netlify.app/assets/remoteEntry.js
```

Estas variables se inyectan en tiempo de build.

El archivo `.env.local` está ignorado por Git.

---

## 25. Despliegue en Netlify

El proyecto fue desplegado en Netlify usando tres sitios independientes:

```txt
1. Shell
2. Pokémon Detail MF
3. Pokémon History MF
```

### Sitios desplegados

```txt
Shell:
https://pokemon-shell-mf.netlify.app/

Pokémon Detail MF:
https://pokemon-detail-mf.netlify.app/

Pokémon History MF:
https://pokemon-history-mf.netlify.app/
```

Cada aplicación tiene su propio `netlify.toml`.

---

## 26. Headers, caché y CORS

### Shell

El Shell define headers de seguridad básicos:

```txt
X-Frame-Options
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

También define caché para assets y `index.html`.

### Remotes

Los remotes exponen `remoteEntry.js` y assets con headers CORS para permitir que el Shell los cargue dinámicamente.

Además, `remoteEntry.js` usa política de no-cache para evitar que el Shell consuma una versión desactualizada del manifest remoto.

---

## 27. CI/CD

El proyecto incluye GitHub Actions:

```txt
.github/workflows/ci.yml
```

El flujo valida:

```txt
npm ci
npm test
npm run build:shell
npm run build:remotes
```

Se usa Node 22, alineado con `.nvmrc`.

---

## 28. Validación final

Validado localmente con:

```bash
npm test
npm run build:shell
npm run build:remotes
```

Resultado:

```txt
Test Files  16 passed
Tests       54 passed
Build Shell OK
Build Remotes OK
```

---

## 29. Estado actual

```txt
Login mock                         ✅
Rutas protegidas                   ✅
Tema claro / oscuro                ✅
Home por categorías                ✅
Buscador fullscreen                ✅
Búsqueda exacta                    ✅
Infinite scroll                    ✅
Modal accesible                    ✅
Focus trap                         ✅
Detail MF                          ✅
Pokédex detail                     ✅
Evolution chain                    ✅
History MF                         ✅
Historial persistente              ✅
Toast último visitado              ✅
Design System compartido           ✅
Remote ErrorBoundary               ✅
Remote fallback reutilizable       ✅
Skeleton reutilizable              ✅
SEO básico                         ✅
Security headers                   ✅
Tests de lógica                    ✅
Tests de componentes               ✅
GitHub Actions CI                  ✅
Build Shell                        ✅
Build Remotes                      ✅
Deploy Netlify                     ✅
```

---

## 30. Limitaciones conocidas

* El login es mock y no usa backend real.
* El historial se almacena en `localStorage`.
* Las evoluciones se muestran como cards normalizadas, no como árbol visual con ramas conectadas.
* No se implementó internacionalización completa.
* No se implementó virtualización para listas muy grandes.
* No se implementó Storybook.

---

## 31. Mejoras futuras

* Agregar Storybook para documentar el Design System.
* Agregar tests de integración para flujo login → home → detalle → historial.
* Agregar E2E con Playwright o Cypress.
* Implementar árbol visual de evolución con conectores.
* Agregar favoritos.
* Agregar filtros por tipo.
* Agregar ordenamiento por ID, nombre o tipo.
* Agregar paginación virtualizada para listas grandes.
* Agregar i18n.
* Evaluar mayor aislamiento de estilos si el número de microfrontends crece, usando Tailwind prefix, CSS Modules, Shadow DOM o una estrategia CSS-in-JS.
