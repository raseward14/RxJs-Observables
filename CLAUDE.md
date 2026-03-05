# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200 (hot reload)
npm run build      # Production build to dist/rxjs/
npm run watch      # Watch mode build (development configuration)
npm test           # Run unit tests with Karma/Jasmine in Chrome
```

## Architecture

This is an Angular 18 learning project focused on RxJS observables and reactive streams.

**Stack:** Angular 18, RxJS 7.8, TypeScript 5.4, Karma/Jasmine for testing.

**Standalone components:** The app uses Angular's modern standalone API — no NgModules. `AppComponent` is bootstrapped directly via `bootstrapApplication()` in `main.ts`.

**Subscription cleanup pattern:** Subscriptions are cleaned up using injected `DestroyRef` rather than `ngOnDestroy`. This is the preferred modern Angular approach in this project:

```ts
const destroyRef = inject(DestroyRef);
const sub = someObservable.subscribe(...);
destroyRef.onDestroy(() => sub.unsubscribe());
```

All new observable subscriptions should follow this pattern to prevent memory leaks.
