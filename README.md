# instaskeleton

[![npm version](https://img.shields.io/npm/v/instaskeleton.svg)](https://www.npmjs.com/package/instaskeleton)
[![bundle size](https://img.shields.io/bundlephobia/minzip/instaskeleton)](https://bundlephobia.com/package/instaskeleton)
[![license](https://img.shields.io/npm/l/instaskeleton.svg)](https://github.com/LittleBoy9/instaskeleton/blob/main/LICENSE)

Ultra-light React skeleton loader with **zero DOM scanning**, **zero layout measurement**, and **zero lag**.

```
~1.2 KB gzipped (JS) + ~0.45 KB (CSS) = ~1.65 KB total
```

## Why instaskeleton?

Most skeleton libraries either:
- Require separate skeleton components for every UI element
- Scan the DOM at runtime to generate placeholders (slow, causes layout shifts)

**instaskeleton** takes a different approach:
- **Zero DOM scanning** — no runtime layout measurement
- **Zero work when not loading** — early exit skips all computation
- **Infer from JSX** — automatic skeleton generation from your React tree
- **Manual schema** — pixel-perfect control when you need it
- **LRU cache** — repeated renders are instant (100-entry limit prevents memory leaks)
- **Reduced motion support** — respects `prefers-reduced-motion`

## Install

```bash
npm install instaskeleton
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

## API Reference

### `<InstaSkeleton>`

The main component for wrapping content with skeleton loading states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | required | Show skeleton when `true`, children when `false` |
| `children` | `ReactNode` | required | Content to display when not loading |
| `schema` | `SkeletonNode \| SkeletonNode[]` | `undefined` | Manual skeleton definition |
| `infer` | `boolean` | `true` | Auto-generate skeleton from children |
| `cacheKey` | `string` | `undefined` | Cache inferred schema for reuse |
| `className` | `string` | `undefined` | Additional CSS class for the skeleton root |
| `animation` | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation style |
| `inferOptions` | `InferOptions` | `{}` | Control inference behavior |

### `InferOptions`

Fine-tune the inference algorithm:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxDepth` | `number` | `6` | Maximum JSX tree depth to traverse |
| `maxNodes` | `number` | `120` | Maximum nodes to process |
| `textLineHeight` | `string \| number` | `'0.95rem'` | Height for text line skeletons |

### `withInstaSkeleton(Component, options)`

HOC to create a skeleton-wrapped version of any component.

```tsx
const WrappedComponent = withInstaSkeleton(MyComponent, {
  skeleton: [...],      // Manual schema
  infer: false,         // Disable inference
  cacheKey: 'my-comp',  // Cache key
  className: 'custom',  // Root class
  animation: 'pulse',   // Animation style
});

// Adds `loading` prop to the component
<WrappedComponent loading={isLoading} {...props} />
```

### `clearInstaSkeletonCache(key?)`

Clear cached schemas:

```tsx
import { clearInstaSkeletonCache } from 'instaskeleton';

// Clear specific cache entry
clearInstaSkeletonCache('product-card');

// Clear all cached schemas
clearInstaSkeletonCache();
```

### `SkeletonNode`

Supported node types:

#### `line` — Text placeholder
```tsx
{ type: 'line', width: '80%', height: '1rem' }
```

#### `rect` — Block placeholder (images, buttons, cards)
```tsx
{ type: 'rect', width: '100%', height: '8rem', radius: '1rem' }
```

#### `circle` — Avatar or icon placeholder
```tsx
{ type: 'circle', width: '3rem', height: '3rem' }
```

#### `group` — Container for nested nodes
```tsx
{
  type: 'group',
  gap: '0.75rem',
  children: [
    { type: 'circle', width: '3rem', height: '3rem' },
    { type: 'line', width: '60%' },
    { type: 'line', width: '40%' },
  ]
}
```

## Performance

### Zero Work When Not Loading

```tsx
// When loading=false, InstaSkeleton returns children immediately
// No inference, no schema processing, no DOM overhead
if (!loading) return <>{children}</>;
```

### LRU Cache with Size Limit

Schemas are cached with a 100-entry limit to prevent memory leaks in long-running SPAs.

### GPU-Accelerated Animations

Shimmer animation uses `will-change: transform` for 60fps performance.

### Reduced Motion Support

Animations are disabled automatically when `prefers-reduced-motion: reduce` is set.

## Choosing The Right Mode

| Use Case | Mode | Why |
|----------|------|-----|
| Quick prototyping | `infer` | Zero config, good approximation |
| Production cards with specific layout | `schema` | Pixel-perfect control |
| Reusable components | `withInstaSkeleton` | Consistent API, one config |
| Lists with repeated items | `infer` + `cacheKey` | Cached after first render |
| Complex nested structures | `infer` + `inferOptions` | Tune depth/node limits |

## Example App

The local example app is a comprehensive visual reference covering:

- Profile cards, product grids, social feeds
- Tables, file lists, pricing cards
- Settings forms with mixed controls
- Chat threads, deeply nested comment threads
- Dashboard layouts with nested cards
- E-commerce product detail pages
- Multi-level navigation structures
- Mixed media galleries
- Complex forms with validation states
- Manual schema mirrors showing exact structure
- HOC usage patterns
- All primitive node types
- Animation comparison (shimmer, pulse, none)

Run it from the repo root:

```bash
npm run example:install
npm run example:dev
```

## Development

```bash
npm run build        # Build the library
npm run typecheck    # Run TypeScript checks
npm run dev          # Watch mode
npm run example:dev  # Run example app
```

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## License

MIT © [LittleBoy9](https://github.com/LittleBoy9)

## Notes

- Inference walks the React element tree, not the rendered DOM.
- Function components may be unwrapped, but hook-heavy components can fall back to child inference.
- If you need strict visual matching, use manual schema.
