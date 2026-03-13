# instaskeleton

React skeleton loader for teams that want fast loading states without DOM scanning.

`instaskeleton` can do two things well:

- infer a placeholder shape from your React tree
- render an exact manual skeleton when the inner component layout matters

## Why it exists

Most skeleton libraries either need separate skeleton components everywhere or inspect the DOM at runtime. This package stays smaller and more predictable:

- no DOM walking
- no layout measurement loop
- simple div-based primitives
- optional schema caching with `cacheKey`
- three animation modes: `shimmer`, `pulse`, `none`

## Install

```bash
npm i instaskeleton
```

Import the bundled styles once:

```tsx
import 'instaskeleton/styles.css';
```

## Quick Start

Use inference when you want the fastest setup:

```tsx
import { InstaSkeleton } from 'instaskeleton';
import 'instaskeleton/styles.css';

type Product = {
  title: string;
  price: string;
};

function ProductCard({
  loading,
  product
}: {
  loading: boolean;
  product: Product;
}) {
  return (
    <InstaSkeleton loading={loading} infer cacheKey="product-card-v1">
      <article>
        <img src="/cover.png" alt="" />
        <h3>{product.title}</h3>
        <p>{product.price}</p>
        <button>Add to cart</button>
      </article>
    </InstaSkeleton>
  );
}
```

## Manual Schema

Use manual schema when you want the skeleton to resemble the inner component structure more closely.

```tsx
import { InstaSkeleton, type SkeletonNode } from 'instaskeleton';

const articleCardSchema: SkeletonNode[] = [
  { type: 'rect', height: '12rem', radius: '1rem' },
  { type: 'line', width: '68%' },
  { type: 'line', width: '92%' },
  { type: 'line', width: '40%' }
];

function ArticleCard({ loading }: { loading: boolean }) {
  return (
    <InstaSkeleton loading={loading} schema={articleCardSchema} infer={false}>
      <article>
        <img src="/hero.png" alt="" />
        <h3>How we removed DOM scanning from loading states</h3>
        <p>Manual schema mirrors the actual card anatomy.</p>
        <small>5 min read</small>
      </article>
    </InstaSkeleton>
  );
}
```

## HOC Pattern

Use `withInstaSkeleton` when you want to preconfigure loading behavior for a reusable component.

```tsx
import { withInstaSkeleton } from 'instaskeleton';

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const StatCardWithSkeleton = withInstaSkeleton(StatCard, {
  skeleton: [
    { type: 'line', width: '35%', height: '0.75rem' },
    { type: 'rect', height: '3rem', radius: '0.75rem' }
  ],
  infer: false,
  cacheKey: 'stat-card'
});

<StatCardWithSkeleton loading={isLoading} label="Downloads" value="12.4k" />;
```

## API

### `InstaSkeleton`

- `loading: boolean`
- `children: ReactNode`
- `schema?: SkeletonNode | SkeletonNode[]`
- `infer?: boolean`
- `cacheKey?: string`
- `className?: string`
- `animation?: 'shimmer' | 'pulse' | 'none'`
- `inferOptions?: { maxDepth?: number; maxNodes?: number; textLineHeight?: string | number }`

### `withInstaSkeleton`

Wraps a component and gives it a `loading` prop. Options:

- `skeleton?: SkeletonNode | SkeletonNode[]`
- `infer?: boolean`
- `cacheKey?: string`
- `className?: string`
- `animation?: 'shimmer' | 'pulse' | 'none'`

### `SkeletonNode`

Supported node types:

- `line`
- `rect`
- `circle`
- `group`

Example:

```tsx
const schema: SkeletonNode[] = [
  {
    type: 'group',
    gap: '0.75rem',
    children: [
      { type: 'circle', width: '3rem', height: '3rem' },
      { type: 'line', width: '48%' },
      { type: 'line', width: '26%' }
    ]
  }
];
```

## Choosing The Right Mode

- Use `infer` when you want minimal setup and a good structural approximation.
- Use manual `schema` when visual fidelity matters.
- Add `cacheKey` when the same inferred structure is rendered often.
- Prefer shallow, reusable schemas for hot paths and long lists.

## Example App

The local example app is the visual reference for the package. It covers:

- profile rows, product cards, and pricing grids
- feeds, file lists, and tables
- settings forms with mixed controls
- manual schema mirrors for inner component anatomy
- HOC-based reusable loading wrappers
- primitive node references and animation comparison

Run it from the repo root:

```bash
npm run example:install
npm run example:dev
```

## Development

```bash
npm run build
npm run typecheck
npm run example:build
```

## Notes

- Inference walks the React element tree, not the rendered DOM.
- Function components may be unwrapped, but hook-heavy components can fall back to child inference.
- If you need strict visual matching, use manual schema.
