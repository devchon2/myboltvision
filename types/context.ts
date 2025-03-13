export interface ContextShard {
  // ...existing code...
  relatedClusters: ContextCluster[];
  // ...existing code...
}

export interface ContextCluster {
  primaryShard?: ContextShard;
  // ...existing code...
}
