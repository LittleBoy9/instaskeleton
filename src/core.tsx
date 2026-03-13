import React, { Children, isValidElement, memo, useMemo } from 'react';
import type {
  InferOptions,
  InstaSkeletonProps,
  SkeletonNode,
  WithInstaSkeletonProps
} from './types';

const DEFAULT_INFER: Required<InferOptions> = {
  maxDepth: 6,
  maxNodes: 120,
  textLineHeight: '0.95rem'
};

const CACHE_MAX_SIZE = 100;
const schemaCache = new Map<string, SkeletonNode[]>();

function setCacheWithLimit(key: string, value: SkeletonNode[]): void {
  if (schemaCache.size >= CACHE_MAX_SIZE) {
    const firstKey = schemaCache.keys().next().value;
    if (firstKey) schemaCache.delete(firstKey);
  }
  schemaCache.set(key, value);
}

function normalizeSchema(schema?: SkeletonNode | SkeletonNode[]): SkeletonNode[] {
  if (!schema) return [];
  return Array.isArray(schema) ? schema : [schema];
}

function resolveDimension(value: string | number | undefined, fallback: string | number): string | number {
  return value ?? fallback;
}

function inferFromChildren(children: React.ReactNode, options?: InferOptions): SkeletonNode[] {
  const merged = { ...DEFAULT_INFER, ...options };
  let nodeCount = 0;

  const walk = (node: React.ReactNode, depth: number): SkeletonNode[] => {
    if (nodeCount >= merged.maxNodes || depth > merged.maxDepth) return [];
    if (node == null || typeof node === 'boolean') return [];

    if (typeof node === 'string' || typeof node === 'number') {
      nodeCount += 1;
      return [{ type: 'line', height: merged.textLineHeight }];
    }

    if (Array.isArray(node)) {
      return node.flatMap((item) => walk(item, depth + 1));
    }

    if (!isValidElement(node)) {
      return [];
    }

    nodeCount += 1;

    const elType = typeof node.type === 'string' ? node.type : 'component';

    if (elType === 'img' || elType === 'video' || elType === 'svg' || elType === 'canvas') {
      return [{ type: 'rect', height: '8rem' }];
    }

    if (elType === 'button' || elType === 'input' || elType === 'textarea' || elType === 'select') {
      return [{ type: 'rect', height: '2.5rem', radius: '0.5rem' }];
    }

    const childNodes = walk(node.props.children, depth + 1);

    if (childNodes.length === 0) {
      return [{ type: 'line', width: '70%', height: merged.textLineHeight }];
    }

    if (childNodes.length === 1) {
      return childNodes;
    }

    return [{ type: 'group', children: childNodes }];
  };

  return walk(Children.toArray(children), 0);
}

function nodeStyle(node: SkeletonNode): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (node.width !== undefined) style.width = resolveDimension(node.width, '');
  if (node.height !== undefined) style.height = resolveDimension(node.height, '');
  if (node.radius !== undefined) style.borderRadius = resolveDimension(node.radius, '');
  if (node.gap !== undefined) style.gap = resolveDimension(node.gap, '');

  return style;
}

const NodeView = memo(function NodeView({ node, animation }: { node: SkeletonNode; animation: InstaSkeletonProps['animation'] }) {
  if (node.type === 'group') {
    return (
      <div className="is-group" style={nodeStyle(node)}>
        {(node.children ?? []).map((child, index) => (
          <NodeView key={index} node={child} animation={animation} />
        ))}
      </div>
    );
  }

  const animClass = animation === 'none' ? '' : ` is-anim-${animation}`;
  return <div className={`is-node is-${node.type}${animClass}`} style={nodeStyle(node)} aria-hidden="true" />;
});

export const InstaSkeleton = memo(function InstaSkeleton({
  loading,
  children,
  schema,
  infer = true,
  cacheKey,
  className,
  animation = 'shimmer',
  inferOptions
}: InstaSkeletonProps) {
  // Early exit: skip all inference work when not loading
  if (!loading) return <>{children}</>;

  const skeletonSchema = useMemo(() => {
    const normalized = normalizeSchema(schema);
    if (normalized.length > 0) return normalized;
    if (!infer) return [];

    if (cacheKey && schemaCache.has(cacheKey)) {
      return schemaCache.get(cacheKey) ?? [];
    }

    const inferred = inferFromChildren(children, inferOptions);
    if (cacheKey) setCacheWithLimit(cacheKey, inferred);
    return inferred;
  }, [schema, infer, children, cacheKey, inferOptions]);

  return (
    <div className={['is-root', className].filter(Boolean).join(' ')} role="status" aria-live="polite" aria-busy="true">
      {skeletonSchema.length > 0 ? (
        skeletonSchema.map((node, index) => <NodeView key={index} node={node} animation={animation} />)
      ) : (
        <NodeView node={{ type: 'line' }} animation={animation} />
      )}
    </div>
  );
});

export function withInstaSkeleton<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<WithInstaSkeletonProps, 'loading'>
) {
  const Wrapped = (props: P & { loading: boolean }) => {
    const { loading, ...rest } = props;

    return (
      <InstaSkeleton
        loading={loading}
        schema={options?.skeleton}
        infer={options?.infer}
        cacheKey={options?.cacheKey}
        className={options?.className}
        animation={options?.animation}
      >
        <Component {...(rest as P)} />
      </InstaSkeleton>
    );
  };

  Wrapped.displayName = `withInstaSkeleton(${Component.displayName || Component.name || 'Component'})`;

  return memo(Wrapped);
}

export function clearInstaSkeletonCache(key?: string): void {
  if (key) {
    schemaCache.delete(key);
    return;
  }

  schemaCache.clear();
}
