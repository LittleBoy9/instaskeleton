import type { ReactNode } from 'react';

export type SkeletonNodeType = 'line' | 'rect' | 'circle' | 'group';

export interface SkeletonNode {
  type: SkeletonNodeType;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  gap?: string | number;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  children?: SkeletonNode[];
}

export interface InferOptions {
  maxDepth?: number;
  maxNodes?: number;
  textLineHeight?: string | number;
}

export interface InstaSkeletonProps {
  loading: boolean;
  children: ReactNode;
  schema?: SkeletonNode | SkeletonNode[];
  infer?: boolean;
  cacheKey?: string;
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'none';
  inferOptions?: InferOptions;
}

export interface WithInstaSkeletonProps {
  loading: boolean;
  skeleton?: SkeletonNode | SkeletonNode[];
  infer?: boolean;
  cacheKey?: string;
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'none';
}
