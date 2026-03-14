# CLAUDE Project Memory: instaskeleton

## Current repo shape

- `src/` contains the published library:
  - `core.tsx` for `InstaSkeleton`, schema inference, cache handling, and `withInstaSkeleton`
  - `types.ts` for all public types
  - `styles.css` for line/rect/circle/group primitives plus shimmer and pulse animation (class prefix: `isk-`)
  - `index.ts` for the public entrypoint and CSS side effect import
- `example/` is the local Vite + React showcase app linked through `"instaskeleton": "file:.."`.
- `dist/` is built with `tsup` to ESM, CJS, and DTS output.

## Product direction

`instaskeleton` is a React skeleton loader for teams that want:

- zero DOM scanning at loading time
- low runtime overhead
- a minimal API
- either heuristic inference from JSX or deterministic manual schemas

The design rule to preserve is simple: when inference is not visually accurate enough, manual schema should make the skeleton resemble the inner component shape, not just generic placeholder bars.

## Public API

Components and functions:

- `InstaSkeleton`
- `withInstaSkeleton`
- `clearInstaSkeletonCache`

Exported types:

- `SkeletonNode`
- `SkeletonNodeType`
- `InferOptions`
- `InstaSkeletonProps`
- `WithInstaSkeletonProps`

Supported node types:

- `line`
- `rect`
- `circle`
- `group` (supports `direction: 'row' | 'column'` and `align: 'start' | 'center' | 'end' | 'stretch'`)

Supported animations:

- `shimmer`
- `pulse`
- `none`

## Example app intent

The example app should stay broad and opinionated. It is not just a smoke test.

It now demonstrates:

- inference mode for nested comments (with custom inferOptions)
- manual schema mirrors for profile cards, product grids, social feeds, article cards, data tables, chat threads, pricing cards, and settings forms
- HOC-based loading wrappers for reusable app patterns (dashboard stats)
- primitive node reference blocks (line, rect, circle, group) with shimmer animation
- explicit side-by-side examples showing how the skeleton should map to the real component anatomy
- per-section animation switching (shimmer / pulse / none) and loading toggle

## Accuracy notes

- Inference walks the React element tree only. It does not measure the rendered DOM.
- Component elements are treated as opaque — inference recurses into `props.children` but does not call or unwrap function components.
- For strict visual matching, manual `schema` is the preferred mode.

## Maintenance notes

- Keep `CLAUDE.md` aligned when the repo structure or example coverage changes.
- Avoid documenting features here that are not actually implemented in `src/`.
- Treat the example as the reference for "how the skeleton should look compared to the inner component."
- CSS classes use the `isk-` prefix to avoid collisions with user styles.

## Next useful work

1. Add tests for inference heuristics, cache behavior, and manual schema rendering.
2. Add SSR-safe examples and hydration guidance.
3. Add benchmark coverage against DOM-based skeleton libraries.
4. Consider a compile-time metadata mode later, but keep runtime behavior small and deterministic.
